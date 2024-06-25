import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Teacher } from '../teachers/teacher.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @Column({ nullable: false })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @Column({ nullable: false })
  lastName: string;

  @ApiProperty({ example: 'string', description: 'Password' })
  @Column({ nullable: false, select: false })
  password: string;

  @OneToOne(() => User, (user) => user.student)
  @JoinColumn()
  user: User;

  @OneToOne(() => Teacher, (teacher) => teacher.id)
  @JoinColumn()
  teacher: Teacher;
}
