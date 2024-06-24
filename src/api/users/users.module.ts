import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../../entities/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { TeachersModule } from '../teachers/teachers.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => TeachersModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
