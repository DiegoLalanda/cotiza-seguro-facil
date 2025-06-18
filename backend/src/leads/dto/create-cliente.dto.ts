// backend/src/leads/dto/create-cliente.dto.ts
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

  // Para una validación genérica de formato de número de teléfono, puedes omitir el argumento:
  // @IsPhoneNumber()
  // O explícitamente pasar undefined si la librería lo permite para validación genérica,
  // o el código de país si quieres validar para un país específico, ej. 'AR' para Argentina.
  // Consultar la documentación de `class-validator` y `libphonenumber-js` (que usa por debajo)
  // para la mejor forma de validar un número genérico o para tu región.
  // Por ahora, lo dejaré sin argumento, que debería intentar una validación más general.
  @IsPhoneNumber(undefined, { message: 'El formato del teléfono no es válido.'}) // Pasamos undefined o el código de país.
  @IsNotEmpty()
  telefono: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 10)
  codigoPostal: string;

  @IsString()
  @IsNotEmpty()
  @Length(7, 9) // Ajusta según el formato de DNI de tu país. Para Argentina, 7 u 8 dígitos.
  dni: string;
}