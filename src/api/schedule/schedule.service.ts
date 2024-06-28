import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from 'src/entities/schedule/schedule.entity';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async getSchedule() {
    return await this.scheduleRepository.find();
  }

  async getScheduleById(id: number) {
    return await this.scheduleRepository.findOneBy({ id: id });
  }

  async createSchedule(
    createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    const { dayOfWeek, startTime, endTime } = createScheduleDto;
    const newSchedule = this.scheduleRepository.create({
      dayOfWeek,
      startTime,
      endTime,
    });
    return await this.scheduleRepository.save(newSchedule);
  }

  async updateSchedule(id: number, schedule: Schedule): Promise<Schedule> {
    await this.scheduleRepository.update(id, schedule);
    return await this.scheduleRepository.findOneBy({ id: id });
  }

  async deleteSchedule(id: number): Promise<{ message: string }> {
    await this.scheduleRepository.delete(id);
    return { message: `Schedule with id ${id} deleted successfully` };
  }
}
