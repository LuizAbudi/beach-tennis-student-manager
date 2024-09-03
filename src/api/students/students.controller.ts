import {
  Controller,
  Put,
  Body,
  Param,
  NotFoundException,
  Get,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOAuth2, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import {
  updateStudentLevelDto,
  updateStudentPaymentDayDto,
} from './dto/update-student.dto';
import { StudentsProfileSchema } from 'src/schemas/students/students.schema';

@ApiOAuth2([], 'Authentication')
@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Put(':id/update-student-level')
  @ApiOperation({ summary: 'Update Student Level' })
  @ApiResponse({ status: 200, description: 'Student Level Updated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async updateStudentLevel(
    @Param('id') id: number,
    @Body() updateStudentDto: updateStudentLevelDto,
  ) {
    const updatedStudent = await this.studentsService.updateStudentLevel(
      id,
      updateStudentDto.level,
    );
    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }
    return { message: 'Student Level Updated' };
  }

  @Get('my-students/:teacherId')
  @ApiOperation({ summary: 'Get all students that teacher have' })
  @ApiResponse({
    status: 200,
    description: 'List of students retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Students not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async getMyStudents(
    @Param('teacherId', ParseIntPipe) teacherId: number,
  ): Promise<StudentsProfileSchema[]> {
    return this.studentsService.getMyStudents(teacherId);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({
    status: 200,
    description: 'List of students retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Teachers not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  findAllTeachers(): Promise<StudentsProfileSchema[]> {
    return this.studentsService.findAllStudents();
  }

  @Put(':id/update-payment-day')
  @ApiOperation({ summary: 'Update Student Payment Day' })
  @ApiResponse({ status: 201, description: 'Student Payment Day Updated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async updateStudentPaymentDay(
    @Param('id') id: number,
    @Body() updateStudentDto: updateStudentPaymentDayDto,
  ) {
    const updatedStudent = await this.studentsService.updateStudentPaymentDay(
      updateStudentDto.paymentDay,
      id,
    );
    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }
    return { message: 'Student Payment Day Updated' };
  }
}
