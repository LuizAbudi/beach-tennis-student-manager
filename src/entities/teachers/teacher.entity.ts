import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  Column,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '../students/student.entity';
import { Schedule } from '../schedule/schedule.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.teacher)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    example: '["2024-06-27", "2024-06-28"]',
    description: 'Lista de datas disponíveis',
  })
  @Column({ type: 'text', nullable: true })
  availableDates: string;

  @ManyToMany(() => Student, (student) => student.teacher)
  @JoinTable({
    name: 'teacher_students',
    joinColumn: { name: 'teacherId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'studentId', referencedColumnName: 'id' },
  })
  students: Student[];

  @ManyToMany(() => Schedule, (schedule) => schedule.teachers)
  @JoinTable({
    name: 'teacher_schedule',
    joinColumn: { name: 'teacherId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'scheduleId', referencedColumnName: 'id' },
  })
  schedules: Schedule[];
}
