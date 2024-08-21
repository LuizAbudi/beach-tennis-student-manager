import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { LevelNames } from 'src/enums';

export class updateStudentLevelDto {
  @ApiProperty({ example: 'PRO', description: 'Student level' })
  @IsEnum(LevelNames)
  level: LevelNames;
}

export class updateStudentPaymentDayDto {
  @ApiProperty({ example: '15', description: 'Payment day {1 - 31}' })
  @IsNumber()
  paymentDay: number;
}
