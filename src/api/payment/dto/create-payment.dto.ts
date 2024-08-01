import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsNumber, IsDate } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 15, description: 'Payment date (1 to 30)' })
  @IsInt()
  @IsOptional()
  paymentDate?: number;

  @ApiProperty({
    example: 180,
    description: 'Payment value (e.g., 180, 240, 320)',
  })
  @IsNumber()
  @IsOptional()
  paymentValue?: number;

  @ApiProperty({ example: '2024-01-01', description: 'Last payment date' })
  @IsDate()
  @IsOptional()
  lastPaymentDate?: Date;
}
