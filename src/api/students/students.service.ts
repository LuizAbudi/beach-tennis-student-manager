import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/entities/students/student.entity';
import { PaymentStatus, PaymentValue, StudentLevel } from 'src/enums';
import { User } from 'src/entities/users/user.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async updatePaymentStatus(studentId: number): Promise<{ message: string }> {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }
    if (student.paymentStatus === PaymentStatus.PAID) {
      student.paymentStatus = PaymentStatus.PENDING;
    } else {
      student.paymentStatus = PaymentStatus.PAID;
    }
    await this.studentRepository.save(student);
    return {
      message: `Student with id ${studentId} payment status updated successfully`,
    };
  }

  async updateStudentLevel(
    studentId: number,
    level: StudentLevel,
  ): Promise<{ message: string }> {
    if (!Object.values(StudentLevel).includes(level)) {
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

  async updateStudentPaymentDate(
    studentId: number,
    paymentDate: number,
  ): Promise<{ message: string }> {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }
    student.paymentDate = paymentDate;
    await this.studentRepository.save(student);
    return {
      message: `Student with id ${studentId} payment date updated successfully`,
    };
  }

  async updateStudentPaymentValue(
    studentId: number,
    paymentValue: PaymentValue,
  ): Promise<{ message: string }> {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }
    student.paymentValue = paymentValue;
    await this.studentRepository.save(student);
    return {
      message: `Student with id ${studentId} payment value updated successfully`,
    };
  }

  async updateStudentLastPaymentDate(
    studentId: number,
    lastPaymentDate: Date,
  ): Promise<{ message: string }> {
    const student = await this.studentRepository.findOneBy({ id: studentId });
    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }
    student.lastPaymentDate = lastPaymentDate;
    await this.studentRepository.save(student);
    return {
      message: `Student with id ${studentId} last payment date updated successfully`,
    };
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
}
