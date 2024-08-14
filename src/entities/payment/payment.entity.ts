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

  @ApiProperty({ example: 'paid', description: 'Payment status' })
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  paymentStatus: PaymentStatus;

  @ApiProperty({ example: '2024-01-01', description: 'Last payment date' })
  @Column({ type: 'date', nullable: true })
  paymentDate: Date | null;

  @OneToOne(() => Student, (student) => student.payment)
  @JoinColumn({ name: 'studentId' })
  student: Student;
}
