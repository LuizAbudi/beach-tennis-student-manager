import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersController } from './teachers.controller';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { TeachersService } from './teachers.service';
import { Student } from 'src/entities/students/student.entity';
import { User } from 'src/entities/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Student, User])],
  providers: [TeachersService],
  controllers: [TeachersController],
  exports: [TeachersService],
})
export class TeachersModule {}
