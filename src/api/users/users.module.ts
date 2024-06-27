import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../entities/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Student } from 'src/entities/students/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
