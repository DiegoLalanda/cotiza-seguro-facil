import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';


export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // Esta es la instancia del servicio
  const authService = inject(AuthService); 

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