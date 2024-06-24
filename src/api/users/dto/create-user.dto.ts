import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserType } from '../enums';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'student',
    description: 'User type: student or teacher',
  })
  @IsEnum(UserType, {
    message: 'userType must be either student or teacher',
  })
  userType: UserType;

  @ApiProperty({ example: 'password', description: 'Password' })
  @IsString()
  password: string;
}
