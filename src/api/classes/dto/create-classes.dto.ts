import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Matches, Max, Min } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 1, description: 'Class day: 1 - 7' })
  @IsNumber()
  @Min(1)
  @Max(7)
  classDay: number;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in the format HH:mm',
  })
  startTime: string;

  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in the format HH:mm',
  })
  endTime: string;

  @IsNumber()
  teacherId: number;

  @IsNumber({}, { each: true })
  studentIds: number[];
}
