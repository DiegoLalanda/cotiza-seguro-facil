import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LucideAngularModule, Home, Car, User, Mail, Phone, Lock, LogOut, ChevronLeft, ChevronRight, Filter, Search, Calendar, ShieldCheck, UserCog, Linkedin,Instagram,ExternalLink } from 'lucide-angular';

import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // Proveer HttpClient con el interceptor de JWT
    provideHttpClient(withInterceptors([jwtInterceptor])),
    // Importar los íconos que usaremos
    importProvidersFrom(LucideAngularModule.pick({
      Home, Car, User, Mail, Phone, Lock, LogOut, ChevronLeft, ChevronRight, Filter, Search, Calendar, ShieldCheck, UserCog, Linkedin,Instagram,ExternalLink
    }))
  ]
};