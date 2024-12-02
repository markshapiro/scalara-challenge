import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RunProcessDto {
  @ApiProperty({ description: 'process id' })
  @IsNumber()
  @IsNotEmpty()
  process_id: number;

  @ApiProperty({ description: 'webhook url' })
  @IsString()
  @IsNotEmpty()
  url: string;
}