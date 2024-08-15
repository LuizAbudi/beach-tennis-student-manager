import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/students/student.entity';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Teacher } from 'src/entities/teachers/teacher.entity';
import { User } from 'src/entities/users/user.entity';
import { Class } from 'src/entities/class/classes.entity';
import { SubscriptionPlan } from 'src/entities/subscriptionPlan/subscriptionPlan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Teacher, User, Class, SubscriptionPlan]),
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
