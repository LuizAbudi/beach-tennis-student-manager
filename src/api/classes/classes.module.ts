import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { Class } from 'src/entities/class/classes.entity';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { Student } from 'src/entities/students/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, Teacher, Student])],
  providers: [ClassesService],
  controllers: [ClassesController],
  exports: [ClassesService],
})
export class ClassesModule {}
