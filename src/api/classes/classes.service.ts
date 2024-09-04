import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/entities/class/classes.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-classes.dto';
import { UpdateClassDto } from './dto/update-classes.dto';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { Student } from 'src/entities/students/student.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async getClasses(teacherId: number): Promise<Class[]> {
    return this.classRepository.find({
      relations: ['students', 'teacher', 'teacher.user'],
      where: { teacher: { id: teacherId } },
    });
  }

  async getClassesByStudent(studentId: number): Promise<Class[]> {
    const classes = await this.classRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.students', 'student')
      .leftJoinAndSelect('class.teacher', 'teacher')
      .leftJoinAndSelect('teacher.user', 'user')
      .where('student.id = :studentId', { studentId })
      .getMany();
  
    if (!classes.length) {
      throw new NotFoundException('No classes found for the given student');
    }
    return classes;
  }  

  async getClassById(classId: number): Promise<any> {
    const classEntity = await this.classRepository.findOne({
      where: { id: classId },
      relations: ['teacher', 'teacher.user', 'students', 'students.user'],
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }

    return {
      id: classEntity.id,
      classDay: classEntity.classDay,
      startTime: classEntity.startTime,
      endTime: classEntity.endTime,
      teacher: classEntity.teacher,
      students: classEntity.students.map((student) => ({
        id: student.id,
        name: student.user.name,
        level: student.level,
      })),
    };
  }

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    const { classDay, startTime, endTime, teacherId, studentIds } =
      createClassDto;

    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${teacherId} not found`);
    }

    const students = await this.studentRepository.find({
      where: { id: In(studentIds) },
    });
    if (students.length !== studentIds.length) {
      throw new NotFoundException('One or more students not found');
    }

    if (classDay < 1 || classDay > 7) {
      throw new BadRequestException(
        'Invalid day of the week. Must be between 1 and 7.',
      );
    }

    if (startTime >= endTime) {
      throw new BadRequestException(
        'Start time must be earlier than end time.',
      );
    }

    if (studentIds.length > 4) {
      throw new BadRequestException('A class can have at most 4 students.');
    }

    const existingTeacherClass = await this.classRepository.findOne({
      where: {
        teacher: teacher,
        classDay: classDay,
        startTime: startTime,
        endTime: endTime,
      },
    });

    if (existingTeacherClass) {
      throw new BadRequestException(
        'Teacher already has a class at the same time.',
      );
    }

    const existingStudentClasses = await this.classRepository.find({
      where: {
        classDay: classDay,
        startTime: startTime,
        endTime: endTime,
      },
      relations: ['students'],
    });

    const conflictingStudentIds = existingStudentClasses
      .flatMap((c) => c.students)
      .filter((student) => studentIds.includes(student.id))
      .map((s) => s.id);

    if (conflictingStudentIds.length > 0) {
      throw new BadRequestException(
        `Students with ids ${conflictingStudentIds.join(
          ', ',
        )} are already enrolled in another class at the same time.`,
      );
    }

    const newClass = this.classRepository.create({
      classDay,
      startTime,
      endTime,
      teacher,
      students,
    });

    return await this.classRepository.save(newClass);
  }

  async updateClass(
    classId: number,
    updateClassDto: UpdateClassDto,
  ): Promise<Class> {
    const { classDay, startTime, endTime, teacherId, studentIds } =
      updateClassDto;

    const existingClass = await this.classRepository.findOne({
      where: { id: classId },
      relations: ['students'],
    });

    if (!existingClass) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }

    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
    });
    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${teacherId} not found`);
    }

    const students = await this.studentRepository.find({
      where: { id: In(studentIds) },
    });
    if (students.length !== studentIds.length) {
      throw new NotFoundException('One or more students not found');
    }

    if (classDay < 1 || classDay > 7) {
      throw new BadRequestException(
        'Invalid day of the week. Must be between 1 and 7.',
      );
    }

    if (startTime >= endTime) {
      throw new BadRequestException(
        'Start time must be earlier than end time.',
      );
    }

    const existingTeacherClass = await this.classRepository.findOne({
      where: {
        teacher: teacher,
        classDay: classDay,
        startTime: startTime,
        endTime: endTime,
        id: Not(classId),
      },
    });

    if (existingTeacherClass) {
      throw new BadRequestException(
        'Teacher already has a class at the same time.',
      );
    }

    const existingStudentClasses = await this.classRepository.find({
      where: {
        classDay: classDay,
        startTime: startTime,
        endTime: endTime,
        id: Not(classId),
      },
      relations: ['students'],
    });

    const conflictingStudentIds = existingStudentClasses
      .flatMap((c) => c.students)
      .filter((student) => studentIds.includes(student.id))
      .map((s) => s.id);

    if (conflictingStudentIds.length > 0) {
      throw new BadRequestException(
        `Students with ids ${conflictingStudentIds.join(
          ', ',
        )} are already enrolled in another class at the same time.`,
      );
    }

    existingClass.classDay = classDay;
    existingClass.startTime = startTime;
    existingClass.endTime = endTime;
    existingClass.teacher = teacher;
    existingClass.students = students;

    return await this.classRepository.save(existingClass);
  }
}
