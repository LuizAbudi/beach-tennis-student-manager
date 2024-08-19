import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsInt, Min, Max } from 'class-validator';

export class CreateSubscriptionPlanDto {
  @ApiProperty({
    example: 'Nome do plano',
    description: 'Nome do plano de assinatura',
  })
  @IsString()
  planName: string;

  @ApiProperty({ example: 180, description: 'Valor do plano' })
  @IsNumber()
  planValue: number;

  @ApiProperty({ example: 3, description: 'Número de aulas na semana' })
  @IsInt()
  @Min(1)
  @Max(5)
  numberOfClasses: number;
}
