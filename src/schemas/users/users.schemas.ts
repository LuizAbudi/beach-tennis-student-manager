import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsInt, Min, Max } from 'class-validator';
import { PaymentValue, StudentLevel, UserType } from 'src/enums';

// schema that is used when a user is pulled from the database
export class UserProfileSchema {
  @ApiProperty({ example: 1, description: 'User id' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  lastName: string;

  @ApiProperty({ example: 'student', description: 'Student' })
  @IsEnum(UserType)
  userType: UserType;
}

// schema that is used when a user signs in
export class UserSignInSchema {
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
export class UserInDbSchema {
  @ApiProperty({ example: 1, description: 'User id' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  lastName: string;

  @ApiProperty({ example: 'student', description: 'Student' })
  @IsEnum(UserType)
  userType: UserType;

  @ApiProperty({ example: 'string', description: 'Password' })
  password: string;
}

// Schema that is used to create a user
export class CreateUserSchema {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'student', description: 'Student or Teacher' })
  @IsEnum(UserType)
  userType: UserType;

  @ApiProperty({ example: 'string', description: 'Password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'A', description: 'A ou B ou C ou D ou Pro' })
  @IsEnum(StudentLevel)
  level?: StudentLevel;

  @ApiProperty({ example: '180', description: 'Payment value' })
  @IsEnum(PaymentValue)
  paymentValue?: PaymentValue;

  @ApiProperty({ example: '15', description: 'Payment date (1 - 30)' })
  @IsInt()
  @Min(1)
  @Max(30)
  paymentDate: number;
}
