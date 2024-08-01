import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StudentLevel } from 'src/enums';

export class updateStudentLevelDto {
  @ApiProperty({ example: 'PRO', description: 'Student level' })
  @IsEnum(StudentLevel)
  level: StudentLevel;
}
