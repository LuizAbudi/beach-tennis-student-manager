import {
  Controller,
  Put,
  Param,
  NotFoundException,
  Post,
  Get,
} from '@nestjs/common';
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

  @Post(':teacherId/schedules/:scheduleId')
  @ApiOperation({ summary: 'Associate Schedule to Teacher' })
  @ApiResponse({ status: 200, description: 'Schedule associated with Teacher' })
  @ApiResponse({ status: 404, description: 'Teacher or Schedule not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async associateTeacherToSchedule(
    @Param('teacherId') teacherId: number,
    @Param('scheduleId') scheduleId: number,
  ) {
    const updatedTeacher = await this.teachersService.associateSchedule(
      teacherId,
      scheduleId,
    );
    if (!updatedTeacher) {
      throw new NotFoundException('Teacher or Schedule not found');
    }
    return { message: 'Schedule associated with Teacher' };
  }

  @Put(':teacherId/schedules/:scheduleId')
  @ApiOperation({ summary: 'Associate Schedule to Teacher' })
  @ApiResponse({ status: 200, description: 'Schedule associated with Teacher' })
  @ApiResponse({ status: 404, description: 'Teacher or Schedule not found' })
  async associateSchedule(
    @Param('teacherId') teacherId: number,
    @Param('scheduleId') scheduleId: number,
  ) {
    const updatedTeacher = await this.teachersService.associateSchedule(
      teacherId,
      scheduleId,
    );
    if (!updatedTeacher) {
      throw new NotFoundException('Teacher or Schedule not found');
    }
    return { message: 'Schedule associated with Teacher' };
  }
}
