import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'; // <-- ExtractJwt es la clave
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from '../../entities/admin.entity';
import { AdminProfile } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {
    const jwtSecret = configService.get<string>('app.jwtSecret');
    if (!jwtSecret) {
      throw new Error('FATAL ERROR: JWT_SECRET is not defined.');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: string; username: string }): Promise<AdminProfile> {
    const admin = await this.adminRepository.findOne({ 
      where: { id: payload.sub, username: payload.username } 
    });
    
    if (!admin) {
      throw new UnauthorizedException('Admin no encontrado o token inválido.');
    }

    const { password, hashPassword, validatePassword, ...adminProfile } = admin;
    return adminProfile as AdminProfile;
  }
}