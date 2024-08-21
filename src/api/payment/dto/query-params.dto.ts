import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryParamsDto {
  @ApiProperty({
    description: 'Page number',
    required: false,
    default: 1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  page = 1;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    default: 10,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  limit = 10;

  @ApiProperty({
    description: 'Payment status',
    required: false,
  })
  @IsOptional()
  status: string;

  @ApiProperty({
    description: 'Start date',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date',
    required: false,
    default: '2024-01-01',
  })
  @IsOptional()
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'Sort order',
    required: false,
    default: 'DESC',
  })
  @IsOptional()
  order: 'ASC' | 'DESC' = 'ASC';

  @ApiProperty({
    description: 'Student ID',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  studentId: number;
}
