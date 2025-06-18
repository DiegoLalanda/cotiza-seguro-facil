// backend/src/admin/admin.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAdminModule } from './auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminLeadsService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { Cliente } from '../leads/entities/cliente.entity';
import { Vehiculo } from '../leads/entities/vehiculo.entity';
// Importa AuthService si solo quieres exportar el servicio específico
// import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthAdminModule, // Importa el módulo completo
    TypeOrmModule.forFeature([Admin, Cliente, Vehiculo]),
  ],
  controllers: [AdminController],
  providers: [AdminLeadsService],
  // Exporta AuthAdminModule para que sus providers exportados (como AuthService)
  // estén disponibles para los módulos que importan AdminModule.
  exports: [AuthAdminModule, AdminLeadsService] // O solo AuthService si prefieres más granularidad
})
export class AdminModule {}