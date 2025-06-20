import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateLeadDto } from '../../core/models/lead.model';
import { toast } from 'ngx-sonner';
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
  progress = signal<number>(0); // <-- NUEVA SEÑAL PARA EL PROGRESO
  showSuccessModal = signal<boolean>(false); // <-- SEÑAL PARA CONTROLAR EL MODAL
  private progressInterval: any;

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
    this.startProgressSimulation(); // <-- INICIAMOS LA SIMULACIÓN

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
      finalize(() => {
        this.isLoading.set(false);
        this.completeProgress(); // <-- COMPLETAMOS Y LIMPIAMOS LA SIMULACIÓN
      })
    ).subscribe({
      next: (response) => {
        toast.success('¡Solicitud enviada!');
        this.showSuccessModal.set(true); // <-- MOSTRAMOS EL MODAL
        this.resetForm(form);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Ocurrió un error inesperado.';
        toast.error(errorMessage);
        console.error('Backend Error:', err);
      }
    });
  }

  private resetForm(form: NgForm): void {
    this.formData = JSON.parse(JSON.stringify(this.initialState));
    form.resetForm(this.formData);
    this.step.set(1);
  }

  closeModalAndReset(form: NgForm): void {
    this.showSuccessModal.set(false);
    this.resetForm(form);
  }

  // --- MÉTODOS PARA LA BARRA DE PROGRESO ---

  private startProgressSimulation(): void {
    this.progress.set(0);
    this.progressInterval = setInterval(() => {
      this.progress.update(p => {
        if (p >= 95) { // Simula que se queda "casi" al final esperando la respuesta
          clearInterval(this.progressInterval);
          return 95;
        }
        return p + 5; // Incrementa el progreso
      });
    }, 200); // Se actualiza cada 200ms
  }

  private completeProgress(): void {
    clearInterval(this.progressInterval);
    this.progress.set(100);
    // Opcional: esconder la barra después de un momento
    setTimeout(() => this.progress.set(0), 500);
  }
}