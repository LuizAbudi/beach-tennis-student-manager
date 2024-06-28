import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/students/student.entity';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Teacher } from 'src/entities/teachers/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Teacher])],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
