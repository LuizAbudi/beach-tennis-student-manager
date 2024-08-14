import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Teacher } from '../teachers/teacher.entity';
import { Payment } from '../payment/payment.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ example: 'PRO', description: 'Student level' })
  @Column()
  level: string;

  @ApiProperty({ example: '15', description: 'Payment day {1 - 31}' })
  @Column()
  paymentDay: number;

  @OneToOne(() => Payment, (payment) => payment.student)
  payment: Payment;

  @ApiProperty({ example: '1', description: 'Teacher ID' })
  @ManyToOne(() => Teacher, (teacher) => teacher.students)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;
}
