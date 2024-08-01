import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from '../students/student.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/enums';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '15', description: 'Payment date' })
  @Column()
  paymentDate: number;

  @ApiProperty({ example: '180', description: '180 ou 240 ou 320' })
  @Column('decimal', { precision: 10, scale: 2 })
  paymentValue: number;

  @ApiProperty({ example: 'paid', description: 'Payment status' })
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @ApiProperty({ example: '2024-01-01', description: 'Last payment date' })
  @Column({ type: 'date', nullable: true })
  lastPaymentDate: Date | null;

  @OneToOne(() => Student, (student) => student.payment)
  @JoinColumn({ name: 'studentId' })
  student: Student;
}
