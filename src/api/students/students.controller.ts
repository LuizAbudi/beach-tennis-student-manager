import {
  Controller,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOAuth2, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import {
  UpdateStudentLastPaymentDateDto,
  UpdateStudentPaymentDateDto,
  UpdateStudentPaymentValueDto,
  updateStudentLevelDto,
} from './dto/update-student.dto';

@ApiOAuth2([], 'Authentication')
@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Put(':id/update-payment-status')
  @ApiOperation({ summary: 'Update Student Payment Status' })
  @ApiResponse({ status: 200, description: 'Student Payment Status Updated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async updatePaymentStatus(@Param('id') id: number) {
    const updatedStudent = await this.studentsService.updatePaymentStatus(id);
    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }
    return { message: 'Student Payment Status Updated' };
  }

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

  @Put(':id/update-student-payment-date')
  @ApiOperation({ summary: 'Update Student Payment Date' })
  @ApiResponse({ status: 200, description: 'Student Payment Date Updated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async updateStudentPaymentDate(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentPaymentDateDto,
  ) {
    const updatedStudent = await this.studentsService.updateStudentPaymentDate(
      id,
      updateStudentDto.paymentDate,
    );
    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }
    return { message: 'Student Payment Date Updated' };
  }

  @Put(':id/update-student-payment-value')
  @ApiOperation({ summary: 'Update Student Payment Value' })
  @ApiResponse({ status: 200, description: 'Student Payment Value Updated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async updateStudentPaymentValue(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentPaymentValueDto,
  ) {
    const updatedStudent = await this.studentsService.updateStudentPaymentValue(
      id,
      updateStudentDto.paymentValue,
    );
    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }
    return { message: 'Student Payment Value Updated' };
  }

  @Put(':id/update-student-last-payment-date')
  @ApiOperation({ summary: 'Update Student Last Payment Date' })
  @ApiResponse({
    status: 200,
    description: 'Student Last Payment Date Updated',
  })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async updateStudentLastPaymentDate(
    @Param('id') id: number,
    @Body() updateStudentDto: UpdateStudentLastPaymentDateDto,
  ) {
    const updatedStudent =
      await this.studentsService.updateStudentLastPaymentDate(
        id,
        updateStudentDto.lastPaymentDate,
      );
    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }
    return { message: 'Student Last Payment Date Updated' };
  }
}
