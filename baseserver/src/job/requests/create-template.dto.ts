import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  basicInfo: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  socialStatus: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  financialStatus: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  repution: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  dataType: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  alogorithm: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  intereedAddress: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  deliveryFrequency: string;

  @ApiProperty({ type: 'string', required: false })
  @IsString()
  @IsOptional()
  deliveryMethod: string;
}
