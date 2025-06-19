// backend/src/database/typeorm.config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Admin } from '../admin/entities/admin.entity';
import { Cliente } from '../leads/entities/cliente.entity';
import { Vehiculo } from '../leads/entities/vehiculo.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const nodeEnv = this.configService.get<string>('app.nodeEnv');
    const isProduction = nodeEnv === 'production';

    // Leer variables de DB individuales desde la configuración de la app
    const host = this.configService.get<string>('app.dbHost');
    const port = this.configService.get<number>('app.dbPort');
    const username = this.configService.get<string>('app.dbUsername');
    const password = this.configService.get<string>('app.dbPassword');
    const database = this.configService.get<string>('app.dbName'); // Nombre de la BD

    // Validar que todas las variables necesarias estén presentes
    if (!host || !port || !username || password === undefined || !database) {
        console.error('Database configuration variables are missing:', {
            host, port, username, passwordDefined: password !== undefined, database
        });
        throw new Error('One or more database configuration variables are missing in app config.');
    }

    console.log(`[DB Config] Node Env: ${nodeEnv}`);
    console.log(`[DB Config] Is Production: ${isProduction}`);
    console.log(`[DB Config] Host: ${host}, Port: ${port}, DB: ${database}`);

    return {
      type: 'postgres',
      host: host,
      port: port,
      username: username,
      password: password,
      database: database, // Nombre de la base de datos
      entities: [Vehiculo, Cliente, Admin],
      synchronize: true,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      logging: !isProduction,
      // logger: !isProduction ? 'advanced-console' : undefined, // Opcional
    };
  }
}