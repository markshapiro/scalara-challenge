import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTxDto {
  @ApiProperty({ description: 'tx bank IBAN' })
  @IsString()
  @IsNotEmpty()
  IBAN: string;

  @ApiProperty({ description: 'tx amount' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;
}