import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { Schedule } from 'src/entities/schedule/schedule.entity';
import { Teacher } from 'src/entities/teachers/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Teacher])],
  providers: [ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
