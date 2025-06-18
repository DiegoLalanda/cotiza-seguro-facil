import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Esta es la instancia del servicio, su nombre es 'authService' (con minúscula)
  const authService = inject(AuthService); 

  // --- CAMBIO CLAVE AQUÍ ---
  // Llama al método en la instancia 'authService', no en la clase 'AuthService'
  const token = authService.getToken(); 

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};