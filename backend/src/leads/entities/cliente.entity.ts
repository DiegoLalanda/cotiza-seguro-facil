import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, OneToMany } from 'typeorm';
import { Vehiculo } from './vehiculo.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  apellido: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 150, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  telefono: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  codigoPostal: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  dni: string;

  // CAMBIO: Eliminamos la columna vehiculoId y la relación OneToOne.
  // @Column({ type: 'uuid' })
  // vehiculoId: string;
  // @OneToOne(() => Vehiculo, { onDelete: 'CASCADE', eager: true })
  // @JoinColumn({ name: 'vehiculoId' })
  // vehiculo: Vehiculo;

  // CAMBIO: Agregamos una relación OneToMany. Un cliente puede tener muchos vehículos (leads).
  @OneToMany(() => Vehiculo, vehiculo => vehiculo.cliente, { cascade: true })
  vehiculos: Vehiculo[];

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}