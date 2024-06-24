import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { User } from 'src/entities/users/user.entity';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('students')
  async getAllStudents(): Promise<User[]> {
    return this.teachersService.getAllStudents();
  }
}
