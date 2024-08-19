import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOAuth2, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { TeachersProfileSchema } from 'src/schemas/teachers/teachers.schema';

@ApiOAuth2([], 'Authentication')
@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('all')
  @ApiOperation({ summary: 'Get all teachers' })
  @ApiResponse({
    status: 200,
    description: 'List of teachers retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Teachers not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  findAllTeachers(): Promise<TeachersProfileSchema[]> {
    return this.teachersService.findAllTeachers();
  }
}
