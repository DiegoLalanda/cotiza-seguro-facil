import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';


export const authGuard: CanActivateFn = (route, state) => {
  // Esta es la instancia del servicio
  const authService = inject(AuthService); 
  const router = inject(Router);

  if (authService.isAuthenticated()) { 
    return true;
  }

  // Redirigir a la página de login
  return router.parseUrl('/login');
};