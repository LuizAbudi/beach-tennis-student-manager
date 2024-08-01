import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule/schedule.entity';
import { Student } from 'src/entities/students/student.entity';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { User } from 'src/entities/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async associateSchedule(teacherId: number, scheduleId: number) {
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: ['schedules'],
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${teacherId} not found`);
    }

    const schedule = await this.scheduleRepository.findOneBy({
      id: scheduleId,
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${scheduleId} not found`);
    }

    teacher.schedules.push(schedule);

    return this.teacherRepository.save(teacher);
  }

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

  async associateTeacherToSchedule(teacherId: number, scheduleId: number) {
    if (isNaN(teacherId) || isNaN(scheduleId)) {
      throw new BadRequestException('Invalid teacherId or scheduleId');
    }

    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: ['schedules'],
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with id ${teacherId} not found`);
    }

    const schedule = await this.scheduleRepository.findOneBy({
      id: scheduleId,
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with id ${scheduleId} not found`);
    }

    teacher.schedules.push(schedule);

    await this.teacherRepository.save(teacher);

    return {
      message: `Teacher with id ${teacherId} associated to schedule with id ${scheduleId}`,
    };
  }
}
