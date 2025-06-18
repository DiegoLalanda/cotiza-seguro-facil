// backend/src/leads/leads.controller.ts

import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }))
  async create(@Body() createLeadDto: CreateLeadDto) {
    const cliente = await this.leadsService.createLead(createLeadDto);
    return { message: 'Solicitud recibida con éxito.', clienteId: cliente.id };
  }
}