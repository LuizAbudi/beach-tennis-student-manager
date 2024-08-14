import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Student } from '../students/student.entity';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.teacher)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Student, (student) => student.teacher)
  students: Student[];
}
