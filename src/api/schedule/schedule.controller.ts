import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOAuth2, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from 'src/entities/schedule/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';

@ApiOAuth2([], 'Authentication')
@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('create-schedule')
  @ApiOperation({ summary: 'Create Schedule' })
  @ApiResponse({ status: 200, description: 'Schedule Created' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async createSchedule(@Body() newSchedule: CreateScheduleDto) {
    await this.scheduleService.createSchedule(newSchedule);
    return { message: 'Schedule Created' };
  }

  @Put(':id/update-schedule')
  @ApiOperation({ summary: 'Update Schedule Data' })
  @ApiResponse({ status: 200, description: 'Schedule Updated' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async updateSchedule(
    @Param('id') id: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    const newSchedule = new Schedule();
    newSchedule.dayOfWeek = updateScheduleDto.dayOfWeek;
    newSchedule.startTime = updateScheduleDto.startTime;
    newSchedule.endTime = updateScheduleDto.endTime;
    const updatedSchedule = await this.scheduleService.updateSchedule(
      id,
      newSchedule,
    );
    if (!updatedSchedule) {
      throw new NotFoundException('Schedule not found');
    }
    return { message: 'Schedule Updated' };
  }

  @Delete(':id/delete-schedule')
  @ApiOperation({ summary: 'Delete Schedule' })
  @ApiResponse({ status: 200, description: 'Schedule Deleted' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async deleteSchedule(@Param('id') id: number) {
    const deletedSchedule = await this.scheduleService.deleteSchedule(id);
    if (!deletedSchedule) {
      throw new NotFoundException('Schedule not found');
    }
    return { message: 'Schedule Deleted' };
  }

  @Get('schedule')
  @ApiOperation({ summary: 'Get Schedule' })
  @ApiResponse({ status: 200, description: 'Schedule Retrieved' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  async getSchedule() {
    return await this.scheduleService.getSchedule();
  }
}
