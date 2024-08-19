import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/entities/students/student.entity';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { User } from 'src/entities/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllTeachers() {
    const teachers = await this.teacherRepository.find({ relations: ['user'] });
    const teachersWithUser = await Promise.all(
      teachers.map(async (teacher) => {
        const user = await this.userRepository.findOneBy({
          id: teacher.user.id,
        });
        return { ...teacher, user };
      }),
    );

    return teachersWithUser;
  }
}
