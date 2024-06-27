import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserType } from 'src/api/users/enums';
import { Student } from '../students/student.entity';

@Entity()
export class User {
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

  @ApiProperty({ example: 'student', description: 'Teacher or Student' })
  @Column({ type: 'enum', enum: UserType, nullable: false })
  @IsEnum(UserType, { message: 'userType must be either student or teacher' })
  userType: UserType;

  @ApiProperty({ example: true, description: 'Status' })
  @Column({ default: true })
  status: boolean;

  @OneToOne(() => Student, (student) => student.user, {
    cascade: true,
    nullable: true,
  })
  student?: Student;
}
