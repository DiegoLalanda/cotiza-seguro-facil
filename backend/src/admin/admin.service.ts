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
    const countQueryBuilder = this.clienteRepository.createQueryBuilder('cliente');

    if (marca) {
      countQueryBuilder.innerJoin('cliente.vehiculos', 'v_filter', 'v_filter.marca ILIKE :marca', { marca: `%${marca}%` });
    }
    if (nombreCliente) {
      countQueryBuilder.andWhere(
        '(cliente.nombre ILIKE :nombreCliente OR cliente.apellido ILIKE :nombreCliente OR cliente.dni LIKE :nombreCliente)',
        { nombreCliente: `%${nombreCliente}%` }
      );
    }
    if (fechaDesde && fechaHasta) {
        const startDate = new Date(fechaDesde);
        startDate.setHours(0,0,0,0);
        const endDate = new Date(fechaHasta);
        endDate.setHours(23,59,59,999);
        countQueryBuilder.andWhere('cliente.createdAt BETWEEN :fechaDesde AND :fechaHasta', { fechaDesde: startDate, fechaHasta: endDate });
    }

    const total = await countQueryBuilder.getCount();

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

    const data = await this.clienteRepository.createQueryBuilder('cliente')
      .leftJoinAndSelect('cliente.vehiculos', 'vehiculo')
      .whereInIds(clienteIds)
      .orderBy('cliente.createdAt', 'DESC')
      .addOrderBy('vehiculo.createdAt', 'DESC')
      .getMany();

    return { data, total, page, limit };
  }
}