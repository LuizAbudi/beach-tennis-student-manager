import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment/payment.entity';
import { PaymentStatus } from 'src/enums';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Student } from 'src/entities/students/student.entity';
import { QueryParamsDto } from './dto/query-params.dto';
import { User } from 'src/entities/users/user.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createPayment(
    studentId: number,
    createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    const student = await this.studentsRepository.findOneBy({ id: studentId });

    if (!student) {
      throw new NotFoundException(`Student with id ${studentId} not found`);
    }

    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      student,
    });

    return this.paymentRepository.save(payment);
  }

  async updatePaymentDate(
    studentId: number,
    lastPaymentDate: Date,
  ): Promise<void> {
    const payment = await this.paymentRepository.findOneBy({
      student: { id: studentId },
    });
    if (!payment) {
      throw new NotFoundException(
        `Payment for student with id ${studentId} not found`,
      );
    }
    payment.paymentDate = lastPaymentDate;
    await this.paymentRepository.save(payment);
  }

  async updatePaymentStatus(
    studentId: number,
    paymentStatus: PaymentStatus,
  ): Promise<void> {
    const payment = await this.paymentRepository.findOneBy({
      student: { id: studentId },
    });
    if (!payment) {
      throw new NotFoundException(
        `Payment for student with id ${studentId} not found`,
      );
    }
    payment.paymentStatus = paymentStatus;
    await this.paymentRepository.save(payment);
  }

  async getStudentPayment(studentId: number): Promise<Payment[]> {
    const payment = await this.paymentRepository.findBy({
      student: { id: studentId },
    });
    if (!payment) {
      throw new NotFoundException(
        `Payment for student with id ${studentId} not found`,
      );
    }
    return payment;
  }

  async getAllPayments(
    allQueries: QueryParamsDto,
    userId: number,
  ): Promise<{ items: Payment[]; total: number }> {
    const { page, limit, status, startDate, endDate, order, studentId } =
      allQueries;

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const query = this.paymentRepository.createQueryBuilder('payment');

    if (user.userType === 'student') {
      query.andWhere('payment.studentId = :studentId', { studentId: userId });
    } else if (user.userType === 'teacher') {
      const validStudent = await this.usersRepository.findOneBy({
        id: studentId,
      });

      if (!validStudent) {
        throw new NotFoundException(`Student with id ${studentId} not found`);
      }

      query.andWhere('payment.studentId = :studentId', { studentId });
    }

    if (status) {
      query.andWhere('payment.paymentStatus = :status', { status });
    }

    if (startDate && endDate) {
      query.andWhere('payment.paymentDate BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    } else if (startDate) {
      query.andWhere('payment.paymentDate = :startDate', { startDate });
    } else if (endDate) {
      query.andWhere('payment.paymentDate = :endDate', { endDate });
    }

    if (order) {
      query.orderBy('payment.paymentDate', order);
    }

    const offset = (page - 1) * limit;

    const [items, total] = await query
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return { items, total };
  }
}
