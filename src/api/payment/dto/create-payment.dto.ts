import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from 'src/enums';
import { IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 'paid', description: 'Payment status' })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @ApiProperty({ example: '2024-01-01', description: 'Payment date' })
  @IsOptional()
  @IsDateString()
  paymentDate?: string;
}
