import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  /**
   * Endpoint de Health Check para servicios de monitoreo como UptimeRobot.
   * Responde con un status 200 OK para indicar que el servicio está activo.
   * Es liviano y no realiza operaciones complejas.
   */
  
  @Get('health')
  @HttpCode(HttpStatus.OK) // Asegura que siempre devuelva un 200 OK
  healthCheck(): object {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}