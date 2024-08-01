import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsISO8601, IsEnum } from 'class-validator';
import { PaymentStatus } from 'src/enums';

export class UpdatePaymentDateDto {
  @ApiProperty({
    example: 15,
    description: 'Payment date (1 to 31)',
  })
  @IsInt()
  paymentDate: number;
}

export class UpdatePaymentValueDto {
  @ApiProperty({
    example: 180,
    description: 'Payment value (e.g., 180, 240, 320)',
  })
  @IsNumber()
  paymentValue: number;
}

export class UpdateLastPaymentDateDto {
  @ApiProperty({
    example: '2024-01-01',
    description: 'Last payment date',
  })
  @IsISO8601()
  lastPaymentDate: Date;
}

export class UpdatePaymentStatusDto {
  @ApiProperty({
    example: 'PAID',
    description: 'Payment status',
  })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}
