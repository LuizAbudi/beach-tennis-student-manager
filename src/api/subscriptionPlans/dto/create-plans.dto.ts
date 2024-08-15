import { ApiProperty } from '@nestjs/swagger';
import { Max, Min } from 'class-validator';

export class CreateSubscriptionPlanDto {
  @ApiProperty({ example: 'Nome do plano', description: '' })
  planName: string;

  @ApiProperty({ example: 'Valores do plano', description: '180, 240, 320' })
  planValue: number;

  @ApiProperty({
    example: 'Numero de aulas na semana',
    description: '1, 2, 3, 4 ou 5',
  })
  @Min(1)
  @Max(5)
  numberOfClasses: number;
}
