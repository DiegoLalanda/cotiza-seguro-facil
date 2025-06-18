import { IsString, IsNotEmpty, IsInt, Min, Max, IsBoolean, IsOptional } from 'class-validator';

export class CreateVehiculoDto {
  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsInt()
  @Min(1950)
  @Max(new Date().getFullYear() + 1) // Año actual + 1
  anioFabricacion: number;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsBoolean()
  @IsOptional()
  tieneGNC?: boolean = false;
}