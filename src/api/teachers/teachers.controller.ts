import {
  Controller,
  Put,
  Param,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOAuth2, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';

@ApiOAuth2([], 'Authentication')
@ApiTags('Teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post(':id/associate-teacher-to-student/:studentId')
  @ApiOperation({ summary: 'Associate Student to Teacher' })
  @ApiResponse({ status: 200, description: 'Student associated with Teacher' })
  @ApiResponse({ status: 404, description: 'Student or Teacher not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async associateTeacherToStudent(
    @Param('id') teacherId: number,
    @Param('studentId') studentId: number,
  ) {
    const updatedStudent = await this.teachersService.associateTeacherToStudent(
      teacherId,
      studentId,
    );
    if (!updatedStudent) {
      throw new NotFoundException('Student or Teacher not found');
    }
    return { message: 'Student associated with Teacher' };
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
