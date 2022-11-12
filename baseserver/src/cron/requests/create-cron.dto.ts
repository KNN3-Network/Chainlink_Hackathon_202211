import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateCronDto {
  @ApiProperty({ type: 'string',required: true})
  @IsString()
  cron: string;

  @ApiProperty({ type: 'array' })
  @IsOptional()
  @IsArray()
  address: string[];

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  owner: string;
}
