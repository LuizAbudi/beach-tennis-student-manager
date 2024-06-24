import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { UserType } from 'src/entities/users/user.entity';

// schema that is used when a user is pulled from the database
export class TeacherProfileSchema {
  @ApiProperty({ example: 1, description: 'User id' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  lastName: string;

  @ApiProperty({ example: 'teacher', description: 'Teacher' })
  @IsEnum(UserType)
  userType: UserType;
}

// schema that is used when a user signs in
export class TeacherSignInSchema {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'string', description: 'password' })
  @IsString()
  readonly password: string;
}

// schema that is used when a user signs into the docs
export class Oauth2SignInSchema {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsEmail()
  readonly username: string;

  @ApiProperty({ example: 'string', description: 'password' })
  @IsString()
  readonly password: string;
}

// schema that is used when a user is pulled from the database
export class TeacherInDbSchema {
  @ApiProperty({ example: 1, description: 'User id' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  lastName: string;

  @ApiProperty({ example: 'teacher', description: 'Teacher' })
  @IsEnum(UserType)
  userType: UserType;

  @ApiProperty({ example: 'string', description: 'Password' })
  password: string;
}

// Schema that is used to create a user
export class CreateTeacherSchema {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'string', description: 'Password' })
  @IsString()
  password: string;
}
