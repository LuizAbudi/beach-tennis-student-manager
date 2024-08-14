import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsInt,
  ValidateIf,
} from 'class-validator';
import { StudentLevel, UserType } from '../../../enums';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John', description: 'Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'student', description: 'Student or Teacher' })
  @IsEnum(UserType)
  userType: UserType;

  @ApiProperty({ example: 'string', description: 'Password' })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'A',
    description: 'A ou B ou C ou D ou Pro',
    required: false,
  })
  @ValidateIf((o) => o.userType === UserType.STUDENT)
  @IsEnum(StudentLevel)
  @IsOptional()
  level?: StudentLevel;

  @ApiProperty({
    example: '1',
    description: 'Teacher id',
    required: false,
  })
  @ValidateIf((o) => o.userType === UserType.STUDENT)
  @IsInt()
  @IsOptional()
  teacherId?: number;
}
