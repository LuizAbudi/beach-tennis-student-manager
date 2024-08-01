import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';
import { Student } from 'src/entities/students/student.entity';
import { Payment } from 'src/entities/payment/payment.entity';
import { PaymentService } from './payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Student])],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService],
})
export class PaymentModule {}
