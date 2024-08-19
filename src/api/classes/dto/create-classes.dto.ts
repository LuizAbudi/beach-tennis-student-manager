import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Matches, Max, Min } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 1, description: 'Class day: 1 - 7' })
  @IsNumber()
  @Min(1)
  @Max(7)
  classDay: number;

  @ApiProperty({ example: '08:00', description: 'Class start time' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'startTime must be in the format HH:mm',
  })
  startTime: string;

  @ApiProperty({ example: '09:00', description: 'Class end time' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'endTime must be in the format HH:mm',
  })
  endTime: string;

  @ApiProperty({ example: 1, description: 'Teacher ID' })
  @IsNumber()
  teacherId: number;

  @ApiProperty({ example: [1, 2, 3], description: 'Student IDs' })
  @IsNumber({}, { each: true })
  studentIds: number[];
}
