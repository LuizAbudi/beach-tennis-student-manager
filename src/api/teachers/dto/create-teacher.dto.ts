import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserType } from 'src/entities/users/user.entity';

export class CreateTeacherDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'student', description: 'Teacher or Student' })
  @IsEnum(UserType, {
    message: 'userType must be either student or teacher',
  })
  userType: UserType;

  @ApiProperty({ example: 'password', description: 'Password' })
  @IsString()
  password: string;
}
