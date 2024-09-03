import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/entities/students/student.entity';
import { User } from 'src/entities/users/user.entity';
import { LevelNames } from 'src/enums';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updateStudentLevel(
    studentId: number,
    level: LevelNames,
  ): Promise<{ message: string }> {
    if (!Object.values(LevelNames).includes(level)) {
      throw new NotFoundException(`Student level ${level} not exists`);
    }
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }
    student.level = level;
    await this.studentRepository.save(student);
    return {
      message: `Student with id ${studentId} level updated successfully`,
    };
  }

  async getMyStudents(teacherId: number) {
    try {
      const students = await this.studentRepository.find({
        where: { teacher: { id: teacherId } },
        relations: ['user'],
      });

      if (!students.length) {
        throw new NotFoundException('No students found for this teacher');
      }

      return students;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get students',
        error.message,
      );
    }
  }

  async findAllStudents() {
    const students = await this.studentRepository.find({ relations: ['user'] });
    const studentsWithUser = await Promise.all(
      students.map(async (student) => {
        const user = await this.userRepository.findOneBy({
          id: student.user.id,
        });
        return { ...student, user };
      }),
    );

    return studentsWithUser;
  }

  async updateStudentPaymentDay(day: number, studentId: number) {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }
    student.paymentDay = day;
    await this.studentRepository.save(student);
    return {
      message: `Student with id ${studentId} payment day updated successfully`,
    };
  }
}
