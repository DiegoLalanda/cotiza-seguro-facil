import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

export type AdminProfile = Omit<Admin, 'password' | 'hashPassword' | 'validatePassword'>;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async validateAdmin(username: string, pass: string): Promise<AdminProfile | null> {
    const admin = await this.adminRepository.findOne({ where: { username } });
    if (admin && (await admin.validatePassword(pass))) {
      const { password, hashPassword, validatePassword, ...result } = admin;
      return result as AdminProfile;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const adminProfile = await this.validateAdmin(loginDto.username, loginDto.password);
    if (!adminProfile) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }
    const payload = { username: adminProfile.username, sub: adminProfile.id };
    const jwtSecret = this.configService.get<string>('app.jwtSecret');
    const jwtExpiresIn = this.configService.get<string>('app.jwtExpiresIn');

    if (!jwtSecret || !jwtExpiresIn) {
      console.error('JWT_SECRET o JWT_EXPIRES_IN no están configurados');
      throw new Error('Configuración de JWT incompleta para login');
    }

    return {
      access_token: this.jwtService.sign(payload, {
        secret: jwtSecret,
        expiresIn: jwtExpiresIn
      }),
      admin: { id: adminProfile.id, username: adminProfile.username, email: adminProfile.email }
    };
  }

  async seedAdmin() {
    const adminUser = this.configService.get<string>('ADMIN_USERNAME');
    const adminPass = this.configService.get<string>('ADMIN_PASSWORD');
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');

    if (!adminUser || !adminPass || !adminEmail) {
      console.warn('ADMIN_USERNAME, ADMIN_PASSWORD, or ADMIN_EMAIL not found in .env, skipping admin seed.');
      return;
    }

    const existingAdmin = await this.adminRepository.findOne({ where: { username: adminUser } });

    if (!existingAdmin) {
      const admin = this.adminRepository.create({
        username: adminUser,
        password: adminPass,
        email: adminEmail,
      });
      await this.adminRepository.save(admin);
      console.log(`Admin user "${adminUser}" seeded successfully.`);
    }
  }
}