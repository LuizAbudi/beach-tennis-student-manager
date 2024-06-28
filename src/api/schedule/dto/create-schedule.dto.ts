import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateScheduleDto {
  @ApiProperty({ example: 'monday', description: 'Day of the week' })
  @IsString()
  dayOfWeek: string;

  @ApiProperty({ example: '08:00:00', description: 'Start time' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '09:00:00', description: 'End time' })
  @IsString()
  endTime: string;
}
