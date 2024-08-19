import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { LevelNames } from 'src/enums';

export class updateStudentLevelDto {
  @ApiProperty({ example: 'PRO', description: 'Student level' })
  @IsEnum(LevelNames)
  level: LevelNames;
}
