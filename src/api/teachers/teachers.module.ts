import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { Teacher } from 'src/entities/teachers/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  providers: [TeachersService],
  controllers: [TeachersController],
  exports: [TeachersService],
})
export class TeachersModule {}
