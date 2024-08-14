import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDate } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: '2024-01-01', description: 'Last payment date' })
  @IsDate()
  @IsOptional()
  paymentDate?: Date;
}
