import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  marca: string;

  @Column({ type: 'int', nullable: false })
  anioFabricacion: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  modelo: string;

  @Column({ type: 'boolean', default: false })
  tieneGNC: boolean;

  @ManyToOne(() => Cliente, cliente => cliente.vehiculos, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'clienteId' })
  cliente: Cliente;

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}