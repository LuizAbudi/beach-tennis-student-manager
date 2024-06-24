import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/users/user.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async getAllStudents(): Promise<User[]> {
    return this.usersService.findAllStudents();
  }

  async create(teacher: Teacher): Promise<Teacher> {
    return this.teachersRepository.save(teacher);
  }
}
