import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-classes.dto';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post('create-class')
  @ApiOperation({ summary: 'Create new class' })
  @ApiResponse({ status: 200, description: 'Class created' })
  @ApiResponse({ status: 404, description: 'Class not created' })
  async createClass(@Body() createClassDto: CreateClassDto) {
    try {
      await this.classesService.createClass(createClassDto);
      return { message: 'Class Created Successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all classes' })
  @ApiResponse({ status: 200, description: 'Classes retrieved' })
  @ApiResponse({ status: 404, description: 'Classes not retrieved' })
  async getClasses() {
    try {
      return await this.classesService.getClasses();
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
  @ApiResponse({ status: 200, description: 'Class updated' })
  @ApiResponse({ status: 404, description: 'Class not updated' })
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
