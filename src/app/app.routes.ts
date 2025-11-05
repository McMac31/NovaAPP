import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth guard/auth.guard';

export const routes: Routes = [
  {
    path: 'agenda-contactos',
    loadComponent: () => import('./pages/agenda-contactos/agenda-contactos.page').then( m => m.AgendaContactosPage),
    canActivate:[AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    redirectTo: 'agenda-contactos',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/'
  },

];
