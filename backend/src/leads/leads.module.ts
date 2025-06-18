import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Vehiculo } from './entities/vehiculo.entity';
import { Cliente } from './entities/cliente.entity';
import { EmailModule } from '../shared/email/email.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo, Cliente]), EmailModule],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService, TypeOrmModule] // Exportar TypeOrmModule si otros módulos lo necesitan
})
export class LeadsModule {}