import { Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Usamos el Layout como componente padre
    children: [
      {
        path: '', // Ruta raíz (formulario)
        loadComponent: () => import('./pages/quote-form/quote-form').then(c => c.QuoteFormComponent),
        title: 'Cotizar Seguro'
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(c => c.LoginComponent),
        title: 'Admin Login'
      },
      // El dashboard NO irá dentro del layout público
    ]
  },
  {
    // El dashboard tiene su propio layout (sin el header/footer públicos)
    path: 'admin/dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(c => c.DashboardComponent),
    canActivate: [authGuard],
    title: 'Dashboard de Leads'
  },
  // Redirección por defecto
  { path: '**', redirectTo: '', pathMatch: 'full' }
];