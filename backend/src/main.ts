import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'https://cotiza-seguro-facil-frontend.onrender.com'],
    credentials: true,
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

  //Port and Host Configuration
  const host = '0.0.0.0';
  const port = process.env.PORT || configService.get<number>('app.port') || 3000;
  await app.listen(port, host);
  console.log(`Application is running on: http://${host}:${port}`);
}
bootstrap();