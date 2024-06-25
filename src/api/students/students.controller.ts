import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/users/user.entity';
import { StudentsService } from './students.service';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('students')
  async getAllStudents(): Promise<User[]> {
    return this.studentsService.getAllStudents();
  }
}
