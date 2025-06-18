// src/app.controller.ts
import { Controller, Get, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // RUTA PARA CREAR UNA COOKIE DE PRUEBA
  @Get('set-cookie')
  setTestCookie(@Res({ passthrough: true }) response: Response) {
    response.cookie('test_cookie', 'hola_mundo', {
      httpOnly: true,
      path: '/',
    });
    return { message: 'Cookie de prueba creada' };
  }

  // RUTA PARA LEER LAS COOKIES
  @Get('get-cookie')
  getTestCookie(@Req() request: Request) {
    console.log('--- Probando /get-cookie ---');
    console.log('Cookies en la petición:', request.cookies);
    console.log('--------------------------');
    return {
      message: 'Revisa la consola del servidor.',
      cookiesRecibidas: request.cookies || 'ninguna',
    };
  }
}