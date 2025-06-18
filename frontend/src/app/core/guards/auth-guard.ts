import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';


export const authGuard: CanActivateFn = (route, state) => {
  // Esta es la instancia del servicio, su nombre es 'authService' (con minúscula)
  const authService = inject(AuthService); 
  const router = inject(Router);

  // --- CAMBIO CLAVE AQUÍ ---
  // Llama al método en la instancia 'authService', no en la clase 'AuthService'
  if (authService.isAuthenticated()) { 
    return true;
  }

  // Redirigir a la página de login
  return router.parseUrl('/login');
};