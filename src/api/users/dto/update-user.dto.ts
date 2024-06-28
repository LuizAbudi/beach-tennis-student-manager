import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsInt()
  id: number;

  @ApiProperty({ example: true, description: 'Status' })
  @IsBoolean()
  status: boolean;
}
