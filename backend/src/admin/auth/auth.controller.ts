// backend/src/admin/auth/auth.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminProfile } from './auth.service';

@Controller('admin/auth')
export class AuthController {
  constructor(private authService: AuthService) {} // Ya no necesitamos ConfigService aquí

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() loginDto: LoginDto) {
    // ¡CAMBIO CLAVE AQUÍ!
    // Simplemente llamamos al servicio y devolvemos su resultado directamente.
    // NestJS lo convertirá en una respuesta JSON automáticamente.
    return this.authService.login(loginDto);
  }

  // ¡ENDPOINT DE LOGOUT ELIMINADO!
  // El logout ahora es responsabilidad del frontend (borrar el token).
  // Podemos eliminar el endpoint /logout para evitar confusiones.

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() request: Request) {
    // Este endpoint no necesita cambios. Funcionará con el nuevo método de autenticación.
    const user = request.user as AdminProfile;
    return { isAuthenticated: true, user };
  }
}