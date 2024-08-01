import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payment/payment.entity';
import { PaymentStatus } from 'src/enums';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async updatePaymentDate(
    studentId: number,
    paymentDate: number,
  ): Promise<void> {
    const payment = await this.paymentRepository.findOneBy({
      student: { id: studentId },
    });
    if (!payment) {
      throw new NotFoundException(
        `Payment for student with id ${studentId} not found`,
      );
    }
    payment.paymentDate = paymentDate;
    await this.paymentRepository.save(payment);
  }

  async updatePaymentValue(
    studentId: number,
    paymentValue: number,
  ): Promise<void> {
    const payment = await this.paymentRepository.findOneBy({
      student: { id: studentId },
    });
    if (!payment) {
      throw new NotFoundException(
        `Payment for student with id ${studentId} not found`,
      );
    }
    payment.paymentValue = paymentValue;
    await this.paymentRepository.save(payment);
  }

  async updateLastPaymentDate(
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
    payment.lastPaymentDate = lastPaymentDate;
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

  async getStudentPayment(studentId: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOneBy({
      student: { id: studentId },
    });
    if (!payment) {
      throw new NotFoundException(
        `Payment for student with id ${studentId} not found`,
      );
    }
    return payment;
  }
}
