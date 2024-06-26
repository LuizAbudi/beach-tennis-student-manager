import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from 'src/entities/students/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), forwardRef(() => UsersModule)],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
