import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Teacher } from '../teachers/teacher.entity';
import { Weekday } from 'src/enums';
import { IsEnum } from 'class-validator';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  @IsEnum(Weekday, {
    message:
      'dayOfWeek must be [monday, tuesday, wednesday, thursday, friday, saturday, sunday]',
  })
  dayOfWeek: Weekday;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @ManyToMany(() => Teacher, (teacher) => teacher.schedules)
  @JoinTable({
    name: 'teacher_schedule',
    joinColumn: { name: 'scheduleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'teacherId', referencedColumnName: 'id' },
  })
  teachers: Teacher[];
}
