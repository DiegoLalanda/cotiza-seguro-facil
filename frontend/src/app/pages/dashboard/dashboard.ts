import { Component, OnInit, signal, computed, effect } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeadsResponse } from '../../core/models/lead.model';
import { LucideAngularModule } from 'lucide-angular';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { AdminService, LeadFilters } from '../../core/services/admin';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, NgxSonnerToaster, DatePipe],
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  // Señales para el estado
  leadsResponse = signal<LeadsResponse | null>(null);
  isLoading = signal<boolean>(true);
  filters = signal<LeadFilters>({
    page: 1,
    limit: 10,
    marca: '',
    nombreCliente: '',
    fechaDesde: '',
    fechaHasta: ''
  });

  // Señales computadas para la paginación
  totalPages = computed(() => {
    const res = this.leadsResponse();
    if (!res || res.total === 0) return 1;
    return Math.ceil(res.total / res.limit);
  });
  
  currentPage = computed(() => this.leadsResponse()?.page || 1);

  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {
    // Reacciona a los cambios en los filtros y vuelve a cargar los datos
    effect(() => {
      this.loadLeads();
    });
  }

  ngOnInit(): void {
    // La carga inicial es manejada por el effect
  }

  loadLeads(): void {
    this.isLoading.set(true);
    const currentFilters = this.filters();
    this.adminService.getLeads(currentFilters).subscribe({
      next: (response) => {
        this.leadsResponse.set(response);
        this.isLoading.set(false);
      },
      error: (err) => {
        toast.error('Error al cargar los leads.');
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  // --- Manejo de Filtros ---
  applyFilters(): void {
    this.filters.update(f => ({ ...f, page: 1 }));
  }
  
  clearFilters(): void {
    this.filters.set({
      page: 1,
      limit: 10,
      marca: '',
      nombreCliente: '',
      fechaDesde: '',
      fechaHasta: ''
    });
  }

  // --- Manejo de Paginación ---
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages() && page !== this.currentPage()) {
      this.filters.update(f => ({ ...f, page }));
    }
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  prevPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  logout(): void {
    this.authService.logout();
  }
}