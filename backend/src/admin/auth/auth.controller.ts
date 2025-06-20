import { Controller, Post, Body, Get, UseGuards, Req, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminProfile } from './auth.service';

@Controller('admin/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() request: Request) {
    const user = request.user as AdminProfile;
    return { isAuthenticated: true, user };
  }
}