// backend/src/leads/leads.service.ts

import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { Cliente } from './entities/cliente.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { EmailService } from '../shared/email/email.service';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculoRepository: Repository<Vehiculo>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    private emailService: EmailService,
    private dataSource: DataSource,
  ) {}

  async createLead(createLeadDto: CreateLeadDto): Promise<Cliente> {
    const { vehiculo: vehiculoData, cliente: clienteData } = createLeadDto;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // CAMBIO: Declaramos 'cliente' como tipo 'Cliente | null' y lo inicializamos.
    let cliente: Cliente | null = null;
    let savedVehiculo: Vehiculo;

    try {
      // 1. Buscar si el cliente ya existe por su email.
      // La asignación ahora es correcta porque la variable puede ser null.
      cliente = await queryRunner.manager.findOne(Cliente, {
        where: { email: clienteData.email },
      });

      if (!cliente) {
        // 2. Si no existe, lo creamos. Verificamos DNI.
        const existingClienteByDni = await queryRunner.manager.findOne(Cliente, { where: { dni: clienteData.dni } });
        if (existingClienteByDni) {
          throw new ConflictException(`El DNI '${clienteData.dni}' ya está registrado por otro cliente.`);
        }
        
        cliente = queryRunner.manager.create(Cliente, clienteData);
        await queryRunner.manager.save(Cliente, cliente);
      } 
      // Si el cliente existe, simplemente continuamos usando la instancia encontrada.

      // 3. Crear el NUEVO vehículo y asociarlo al cliente (nuevo o existente).
      const nuevoVehiculo = queryRunner.manager.create(Vehiculo, {
        ...vehiculoData,
        cliente: cliente, // Asociamos la instancia completa del cliente
      });

      savedVehiculo = await queryRunner.manager.save(Vehiculo, nuevoVehiculo);

      await queryRunner.commitTransaction();
      
      // La llamada a sendLeadNotification ahora es correcta.
      if (cliente && savedVehiculo) {
         await this.emailService.sendLeadNotification(cliente, savedVehiculo);
      } else {
        console.error("No se pudo encontrar el cliente o vehículo recién creado para enviar la notificación.");
      }

      return cliente;

    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof ConflictException) {
          throw error;
      }
      if (error.code === '23505') {
        if (error.detail.includes('email')) {
            throw new ConflictException(`El email '${clienteData.email}' ya fue registrado.`);
        }
        if (error.detail.includes('dni')) {
            throw new ConflictException(`El DNI '${clienteData.dni}' ya fue registrado.`);
        }
      }
      console.error("Error creating lead:", error);
      throw new InternalServerErrorException('Error al procesar la solicitud.');
    } finally {
      await queryRunner.release();
    }
  }
}