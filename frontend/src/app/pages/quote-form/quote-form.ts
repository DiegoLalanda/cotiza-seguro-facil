import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateLeadDto } from '../../core/models/lead.model';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { LucideAngularModule } from 'lucide-angular';
import { finalize } from 'rxjs';
import { LeadsService } from '../../core/services/leads';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './quote-form.html',
})
export class QuoteFormComponent {
  step = signal<number>(1);
  isLoading = signal<boolean>(false);
  public readonly currentYear = new Date().getFullYear();

  private readonly initialState = {
    vehiculo: {
      marca: '',
      anio: this.currentYear,
      modelo: '',
      tieneGNC: false
    },
    cliente: {
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      codigoPostal: '',
      dni: ''
    }
  };

  // El formData del formulario puede tener una estructura ligeramente diferente
  formData = JSON.parse(JSON.stringify(this.initialState));

  constructor(private leadsService: LeadsService) { }

  nextStep(): void {
    this.step.set(2);
  }

  prevStep(): void {
    this.step.set(1);
  }

  submitForm(form: NgForm): void {
    if (form.invalid) {
      toast.error('Por favor, complete todos los campos requeridos.');
      return;
    }

    this.isLoading.set(true);

    // Creamos el objeto DTO con la estructura correcta ANTES de enviarlo.
    const leadData: CreateLeadDto = {
      cliente: this.formData.cliente,
      vehiculo: {
        marca: this.formData.vehiculo.marca,
        modelo: this.formData.vehiculo.modelo,
        tieneGNC: this.formData.vehiculo.tieneGNC,
        anioFabricacion: this.formData.vehiculo.anio
      }
    };

    // Enviamos el objeto DTO formateado correctamente
    this.leadsService.createLead(leadData).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe({
      next: (response) => {
        toast.success('¡Solicitud enviada! Nos pondremos en contacto pronto.');
        this.resetForm(form);
      },
      error: (err) => {
        // El error de ngx-sonner debería desaparecer ahora
        const errorMessage = err.error?.message || 'Ocurrió un error inesperado.';
        toast.error(errorMessage);
        console.error('Backend Error:', err); // Buena práctica dejar un log del error completo
      }
    });
  }

  private resetForm(form: NgForm): void {
    this.formData = JSON.parse(JSON.stringify(this.initialState));
    form.resetForm(this.formData);
    this.step.set(1);
  }
}