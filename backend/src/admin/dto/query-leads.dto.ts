import { IsOptional, IsInt, Min, IsString, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryLeadsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  nombreCliente?: string;

  @IsOptional()
  @IsDateString()
  fechaDesde?: string;

  @IsOptional()
  @IsDateString()
  fechaHasta?: string;
}