import { Controller, Get, Query, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { AdminLeadsService } from './admin.service';
import { QueryLeadsDto } from './dto/query-leads.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Controller('admin/leads')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminLeadsService: AdminLeadsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
  findAll(@Query() queryLeadsDto: QueryLeadsDto) {
    return this.adminLeadsService.findAllLeads(queryLeadsDto);
  }
}