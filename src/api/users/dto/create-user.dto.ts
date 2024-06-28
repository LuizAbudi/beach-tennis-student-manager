import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsInt,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { PaymentValue, StudentLevel, UserType } from '../../../enums';

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
    example: '180',
    description: 'Payment value',
    required: false,
  })
  @ValidateIf((o) => o.userType === UserType.STUDENT)
  @IsEnum(PaymentValue)
  @IsOptional()
  paymentValue?: PaymentValue;

  @ApiProperty({
    example: '15',
    description: 'Payment date (1 - 30)',
    required: false,
  })
  @ValidateIf((o) => o.userType === UserType.STUDENT)
  @IsInt()
  @Min(1)
  @Max(30)
  @IsOptional()
  paymentDate?: number;
}
