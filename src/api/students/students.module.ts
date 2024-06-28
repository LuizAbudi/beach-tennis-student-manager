import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/students/student.entity';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { User } from 'src/entities/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Teacher, User])],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
