import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Cliente } from '../../leads/entities/cliente.entity';
import { Vehiculo } from 'src/leads/entities/vehiculo.entity';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('app.emailHost'),
      port: this.configService.get<number>('app.emailPort'),
      secure: this.configService.get<number>('app.emailPort') === 465,
      auth: {
        user: this.configService.get<string>('app.emailUser'),
        pass: this.configService.get<string>('app.emailPass'),
      },
    });
  }
  
  async sendLeadNotification(cliente: Cliente, vehiculo: Vehiculo) {
    const adminEmail = this.configService.get<string>('app.adminNotificationEmail');
    const emailFrom = this.configService.get<string>('app.emailFrom');

    const mailOptions = {
      from: emailFrom,
      to: adminEmail,
      subject: 'Nuevo Pedido de Cotizacion de Seguro Vehicular Recibido',
      html: `
        <h1>Nuevo Pedido de Cotizacion Recibido</h1>
        <p><strong>Nombre:</strong> ${cliente.nombre} ${cliente.apellido}</p>
        <p><strong>Email:</strong> ${cliente.email}</p>
        <p><strong>Teléfono:</strong> ${cliente.telefono}</p>
        <p><strong>DNI:</strong> ${cliente.dni}</p>
        <p><strong>Código Postal:</strong> ${cliente.codigoPostal}</p>
        <hr>
        <h2>Datos del Vehículo de esta Cotización</h2>
        <p><strong>Marca:</strong> ${vehiculo.marca}</p>
        <p><strong>Modelo:</strong> ${vehiculo.modelo}</p>
        <p><strong>Año Fabricación:</strong> ${vehiculo.anioFabricacion}</p>
        <p><strong>Tiene GNC:</strong> ${vehiculo.tieneGNC ? 'Sí' : 'No'}</p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Notificación de lead enviada a:', adminEmail);
    } catch (error) {
      console.error('Error enviando email:', error);
    }
  }
}