export interface Vehiculo {
  id: string; 
  marca: string;
  modelo: string;
  tieneGNC: boolean;
  anioFabricacion: number; 
}

export interface Cliente {
  id: string; 
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  codigoPostal: string;
  dni: string;
  createdAt: string;
  vehiculos: Vehiculo[];
}

export interface CreateLeadDto {
  vehiculo: {
    marca: string;
    anioFabricacion: number;
    modelo: string;
    tieneGNC: boolean;
  };
  cliente: {
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    codigoPostal: string;
    dni: string;
  };
}

export interface LeadsResponse {
    data: Cliente[];
    total: number;
    page: number;
    limit: number;
}