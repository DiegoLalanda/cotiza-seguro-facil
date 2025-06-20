import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, Length, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber(undefined, { message: 'El formato del teléfono no es válido.'})
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 10)
  codigoPostal: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 9)
  dni: string;
}