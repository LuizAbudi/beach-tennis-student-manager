import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Weekday } from 'src/enums';

export class UpdateScheduleDto {
  @ApiProperty({ example: 'monday', description: 'Day of the week' })
  @IsEnum(Weekday)
  dayOfWeek: Weekday;

  @ApiProperty({ example: '08:00:00', description: 'Start time' })
  @IsString()
  startTime: string;

  @ApiProperty({ example: '10:00:00', description: 'End time' })
  @IsString()
  endTime: string;
}
