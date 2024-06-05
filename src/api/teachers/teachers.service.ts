import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teachersRepository: Repository<Teacher>,
  ) {}
}
