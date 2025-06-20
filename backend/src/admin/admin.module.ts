import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthAdminModule } from './auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminLeadsService } from './admin.service';
import { Admin } from './entities/admin.entity';
import { Cliente } from '../leads/entities/cliente.entity';
import { Vehiculo } from '../leads/entities/vehiculo.entity';

@Module({
  imports: [
    AuthAdminModule,
    TypeOrmModule.forFeature([Admin, Cliente, Vehiculo]),
  ],
  controllers: [AdminController],
  providers: [AdminLeadsService],
  exports: [AuthAdminModule, AdminLeadsService]
})
export class AdminModule {}