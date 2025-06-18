import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'https://tu-frontend-en-render.onrender.com'], // Añade la URL de tu frontend en Render
    credentials: true, // Importante para que las cookies se envíen
  });


  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en DTOs
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true, // Transforma payloads a instancias de DTOs
      transformOptions: {
        enableImplicitConversion: true, // Convierte tipos primitivos automáticamente
      },
    }),
  );

  // Prefijo global para la API (opcional)
  // app.setGlobalPrefix('api/v1');
  const host = 'localhost';
  const port = configService.get<number>('app.port') || 3000;
  await app.listen(port,host);
  console.log(`Application is running on: http://${host}:${port}`);
}
bootstrap();