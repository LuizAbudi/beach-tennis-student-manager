import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule/schedule.entity';
import { Student } from 'src/entities/students/student.entity';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async associateSchedule(teacherId: number, scheduleId: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: ['schedules'],
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${teacherId} not found`);
    }

    const schedule = await this.scheduleRepository.findOneBy({
      id: scheduleId,
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${scheduleId} not found`);
    }

    teacher.schedules.push(schedule);

    return this.teacherRepository.save(teacher);
  }

  async associateTeacherToStudent(teacherId: number, studentId: number) {
    if (isNaN(teacherId) || isNaN(studentId)) {
      throw new BadRequestException('Invalid teacherId or studentId');
    }
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: ['students'],
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${teacherId} not found`);
    }

    const student = await this.studentRepository.findOneBy({
      id: studentId,
    });

    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }

    teacher.students.push(student);

    await this.teacherRepository.save(teacher);

    return {
      message: `Student with id ${studentId} has been associated with teacher with id ${teacherId}`,
    };
  }
}
