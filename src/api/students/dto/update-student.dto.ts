import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { PaymentValue, StudentLevel } from 'src/enums';

export class UpdateStudentStatusDto {
  @ApiProperty({ example: 'paid', description: 'Payment status' })
  @IsString()
  paymentStatus?: string;
}

export class updateStudentLevelDto {
  @ApiProperty({ example: 'PRO', description: 'Student level' })
  @IsEnum(StudentLevel)
  level: StudentLevel;
}

export class UpdateStudentPaymentDateDto {
  @ApiProperty({ example: 15, description: 'Payment date (1 a 30)' })
  @IsInt()
  @Min(1)
  @Max(30)
  paymentDate: number;
}

export class UpdateStudentPaymentValueDto {
  @ApiProperty({ example: 180, description: '180 ou 240 ou 320' })
  @IsEnum(PaymentValue)
  paymentValue: PaymentValue;
}

export class UpdateStudentLastPaymentDateDto {
  @ApiProperty({ example: '2021-01-01', description: 'Last Payment date' })
  @IsDateString()
  lastPaymentDate?: Date;
}
