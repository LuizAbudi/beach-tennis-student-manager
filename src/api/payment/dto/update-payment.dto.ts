import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsEnum } from 'class-validator';
import { PaymentStatus } from 'src/enums';

export class UpdatePaymentDateDto {
  @ApiProperty({
    example: '2024-01-01',
    description: 'Last payment date',
  })
  @IsISO8601()
  paymentDate: Date;
}
export class UpdatePaymentStatusDto {
  @ApiProperty({
    example: 'PAID',
    description: 'Payment status',
  })
  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;
}
