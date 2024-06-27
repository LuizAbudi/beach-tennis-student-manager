import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PaymentValue } from 'src/api/users/enums';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ example: 'PRO', description: 'Student level' })
  @Column()
  level: string;

  @ApiProperty({ example: 'paid', description: 'Payment status' })
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @ApiProperty({ example: '15', description: 'Payment date (1 a 30)' })
  @Column({ type: 'int', width: 2 })
  paymentDate: number;

  @ApiProperty({ example: '180', description: '180 ou 240 ou 320' })
  @Column()
  paymentValue: PaymentValue;

  @ApiProperty({ example: '2021-01-01', description: 'Last Payment date' })
  @Column({ nullable: true })
  lastPaymentDate: Date;
}
