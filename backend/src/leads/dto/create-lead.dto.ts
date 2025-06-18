import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmptyObject } from 'class-validator';
import { CreateVehiculoDto } from './create-vehiculo.dto';
import { CreateClienteDto } from './create-cliente.dto';


export class CreateLeadDto {
  @ValidateNested()
  @Type(() => CreateVehiculoDto)
  @IsNotEmptyObject()
  vehiculo: CreateVehiculoDto;

  @ValidateNested()
  @Type(() => CreateClienteDto)
  @IsNotEmptyObject()
  cliente: CreateClienteDto;
}