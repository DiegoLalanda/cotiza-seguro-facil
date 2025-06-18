export interface Vehiculo {
  id: string; 
  marca: string;
  modelo: string;
  tieneGNC: boolean;

  // --- CAMBIO CLAVE AQUÍ ---
  // La propiedad que viene del backend se llama 'anioFabricacion'.
  // Cambiamos 'anio' por 'anioFabricacion' para que coincida.
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
  vehiculos: Vehiculo[]; // Esto ya debería estar correcto.
}

export interface CreateLeadDto {
  vehiculo: {
    marca: string;
    anioFabricacion: number; // Esto ya estaba correcto para enviar datos.
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