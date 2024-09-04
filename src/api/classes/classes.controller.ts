import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-classes.dto';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('create-class')
  @ApiOperation({ summary: 'Create new class' })
  @ApiResponse({ status: 201, description: 'Class created' })
  async createClass(@Body() createClassDto: CreateClassDto) {
    try {
      await this.classesService.createClass(createClassDto);
      return { message: 'Class Created Successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('/teacher/:teacherId')
  @ApiOperation({ summary: 'Get all classes' })
  @ApiResponse({ status: 200, description: 'Classes retrieved' })
  @ApiResponse({ status: 404, description: 'Classes not retrieved' })
  @ApiParam({
    name: 'teacherId',
    description: 'Id do professor',
    required: true,
  })
  async getClasses(@Param('teacherId') teacherId: number) {
    try {
      return await this.classesService.getClasses(teacherId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get('/student/:studentId')
  @ApiOperation({ summary: 'Get all classes for a student' })
  @ApiResponse({ status: 200, description: 'Classes retrieved' })
  @ApiResponse({ status: 404, description: 'Classes not retrieved' })
  @ApiParam({ name: 'studentId', description: 'Id do estudante', required: true })
  async getClassesByStudent(@Param('studentId') studentId: number) {
    try {
      return await this.classesService.getClassesByStudent(studentId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get class by id' })
  @ApiResponse({ status: 200, description: 'Class retrieved' })
  @ApiResponse({ status: 404, description: 'Class not retrieved' })
  async getClassById(@Body('classId') classId: number) {
    try {
      return await this.classesService.getClassById(classId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update class' })
  @ApiResponse({ status: 201, description: 'Class updated' })
  async updateClass(
    @Body('classId') classId: number,
    @Body() updateClassDto: CreateClassDto,
  ) {
    try {
      return await this.classesService.updateClass(classId, updateClassDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
