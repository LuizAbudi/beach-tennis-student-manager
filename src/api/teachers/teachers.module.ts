import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from './teachers.controller';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { TeachersService } from './teachers.service';
import { Schedule } from 'src/entities/schedule/schedule.entity';
import { Student } from 'src/entities/students/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Schedule, Student])],
  providers: [TeachersService],
  controllers: [TeachersController],
  exports: [TeachersService],
})
export class TeachersModule {}
