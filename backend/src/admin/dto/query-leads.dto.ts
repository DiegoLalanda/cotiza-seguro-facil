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
  nombreCliente?: string; // Para buscar por nombre o apellido

  @IsOptional()
  @IsDateString()
  fechaDesde?: string; // Formato YYYY-MM-DD

  @IsOptional()
  @IsDateString()
  fechaHasta?: string; // Formato YYYY-MM-DD
}