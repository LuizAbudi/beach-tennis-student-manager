import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export enum UserType {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

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
}
