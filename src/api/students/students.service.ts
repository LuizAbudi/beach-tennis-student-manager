import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/users/user.entity';
import { Student } from 'src/entities/students/student.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async getAllStudents(): Promise<User[]> {
    return this.usersService.findAllStudents();
  }

  async create(student: Student): Promise<Student> {
    return this.studentsRepository.save(student);
  }
}
