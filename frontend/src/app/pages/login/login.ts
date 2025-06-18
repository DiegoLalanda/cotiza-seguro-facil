import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

// --- CAMBIO 1: La importación ---
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { LucideAngularModule } from 'lucide-angular';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  // --- CAMBIO 2: El array de imports ---
  imports: [CommonModule, FormsModule, RouterLink, NgxSonnerToaster, LucideAngularModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  // ... el resto del código del componente no cambia ...
  credentials = { username: '', password: '' };
  isLoading = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.credentials.username || !this.credentials.password) {
      toast.error('Por favor, ingrese usuario y contraseña.');
      return;
    }
    this.isLoading.set(true);
    this.authService.login(this.credentials).pipe(
      finalize(() => this.isLoading.set(false))
    ).subscribe(response => {
      if (response) {
        toast.success('¡Bienvenido!');
        this.router.navigate(['/admin/dashboard']);
      } else {
        toast.error('Credenciales inválidas. Por favor, intente de nuevo.');
      }
    });
  }
}