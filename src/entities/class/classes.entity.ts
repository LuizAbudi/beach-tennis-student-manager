import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Teacher } from '../teachers/teacher.entity';
import { Student } from '../students/student.entity';
import { IsString, Matches, IsNotEmpty, Min, Max } from 'class-validator';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(1)
  @Max(7)
  classDay: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'startTime must be in the format HH:mm',
  })
  startTime: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'endTime must be in the format HH:mm',
  })
  endTime: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.classes)
  teacher: Teacher;

  @ManyToMany(() => Student, (student) => student.classes)
  @JoinTable()
  students: Student[];
}
