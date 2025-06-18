// src/app.module.ts

// 1. Importaciones necesarias para los middlewares
import { Module, OnModuleInit, NestModule, MiddlewareConsumer } from '@nestjs/common'; 

// Tus imports existentes
import { ConfigModule } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';
import { AdminModule } from './admin/admin.module';
import { EmailModule } from './shared/email/email.module';
import appConfig from './config/app.config';
import { AuthService } from './admin/auth/auth.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: '.env',
    }),
    DatabaseModule,
    EmailModule,
    LeadsModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit { 
   constructor(private readonly authService: AuthService) {}

   async onModuleInit() {
     if (process.env.NODE_ENV === 'development') {
       await this.authService.seedAdmin();
     }
   }
}