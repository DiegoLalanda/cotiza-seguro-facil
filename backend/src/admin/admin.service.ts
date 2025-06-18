import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../leads/entities/cliente.entity';
import { QueryLeadsDto } from './dto/query-leads.dto';

@Injectable()
export class AdminLeadsService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async findAllLeads(queryDto: QueryLeadsDto): Promise<{ data: Cliente[], total: number, page: number, limit: number }> {
    const { page = 1, limit = 10, marca, nombreCliente, fechaDesde, fechaHasta } = queryDto;

    // --- PASO 1: CONSTRUIR LA CONSULTA PARA OBTENER IDs Y TOTAL ---
    // Esta consulta SÍ tiene los joins y wheres para filtrar correctamente, pero solo selecciona el ID del cliente.
    const countQueryBuilder = this.clienteRepository.createQueryBuilder('cliente');

    if (marca) {
      // Usamos innerJoin aquí para que el conteo sea correcto (solo clientes con esa marca)
      countQueryBuilder.innerJoin('cliente.vehiculos', 'v_filter', 'v_filter.marca ILIKE :marca', { marca: `%${marca}%` });
    }
    if (nombreCliente) {
      countQueryBuilder.andWhere(
        '(cliente.nombre ILIKE :nombreCliente OR cliente.apellido ILIKE :nombreCliente OR cliente.dni LIKE :nombreCliente)',
        { nombreCliente: `%${nombreCliente}%` }
      );
    }
    // ... (aquí irían los filtros de fecha igual que antes, aplicados a countQueryBuilder) ...
    if (fechaDesde && fechaHasta) {
        const startDate = new Date(fechaDesde);
        startDate.setHours(0,0,0,0);
        const endDate = new Date(fechaHasta);
        endDate.setHours(23,59,59,999);
        countQueryBuilder.andWhere('cliente.createdAt BETWEEN :fechaDesde AND :fechaHasta', { fechaDesde: startDate, fechaHasta: endDate });
    } // ... etc ...

    const total = await countQueryBuilder.getCount();

    // Ahora aplicamos paginación a esta consulta para obtener solo los IDs de la página actual
    const clienteIds = await countQueryBuilder
      .select('cliente.id')
      .orderBy('cliente.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getRawMany()
      .then(results => results.map(r => r.cliente_id));

    if (clienteIds.length === 0) {
      return { data: [], total, page, limit };
    }

    // --- PASO 2: OBTENER LOS DATOS COMPLETOS PARA ESOS IDs ---
    // Ahora hacemos la consulta final, trayendo todos los datos y vehículos,
    // pero solo para los IDs de los clientes de nuestra página.
    const data = await this.clienteRepository.createQueryBuilder('cliente')
      .leftJoinAndSelect('cliente.vehiculos', 'vehiculo')
      .whereInIds(clienteIds) // La magia está aquí
      .orderBy('cliente.createdAt', 'DESC')
      .addOrderBy('vehiculo.createdAt', 'DESC')
      .getMany();

    return { data, total, page, limit };
  }
}