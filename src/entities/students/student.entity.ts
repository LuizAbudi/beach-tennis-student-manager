import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Teacher } from '../teachers/teacher.entity';
import { Payment } from '../payment/payment.entity';
import { Class } from '../class/classes.entity';
import { SubscriptionPlan } from '../subscriptionPlan/subscriptionPlan.entity';
import { LevelNames } from 'src/enums';
import { IsEnum } from 'class-validator';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ example: 'PRO', description: 'Student level' })
  @IsEnum(LevelNames)
  @Column()
  level: LevelNames;

  @ApiProperty({ example: '15', description: 'Payment day {1 - 31}' })
  @Column({ default: 1 })
  paymentDay: number;

  @OneToOne(() => Payment, (payment) => payment.student)
  payment: Payment;

  @ApiProperty({ example: '1', description: 'Teacher ID' })
  @ManyToOne(() => Teacher, (teacher) => teacher.students)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @ManyToMany(() => Class)
  @JoinTable()
  classes: Class[];

  @ManyToOne(
    () => SubscriptionPlan,
    (subscriptionPlan) => subscriptionPlan.students,
  )
  @JoinColumn({ name: 'subscriptionPlanId' })
  subscriptionPlan: SubscriptionPlan;
}
