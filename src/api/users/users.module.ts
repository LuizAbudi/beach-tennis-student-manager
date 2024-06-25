import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../entities/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { TeachersModule } from '../teachers/teachers.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => TeachersModule),
    forwardRef(() => StudentsModule),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
