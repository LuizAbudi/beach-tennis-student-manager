import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
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

  @ManyToMany(() => Schedule, (schedule) => schedule.teachers)
  @JoinTable({
    name: 'teacher_schedule',
    joinColumn: { name: 'teacherId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'scheduleId', referencedColumnName: 'id' },
  })
  schedules: Schedule[];

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];
}
