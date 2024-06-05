import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';

@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}
}
