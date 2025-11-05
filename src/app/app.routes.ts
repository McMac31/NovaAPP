import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth guard/auth.guard';

export const routes: Routes = [
  {
    path: 'agenda-contactos',
    loadComponent: () => import('./pages/agenda-contactos/agenda-contactos.page').then( m => m.AgendaContactosPage),
    canActivate:[AuthGuard]
  },
  // Ruta para la pantalla de "Crear Contacto" (Requisito 3)
  {
    path: 'contacto-nuevo',
    loadComponent: () => import('./pages/contacto-nuevo/contacto-nuevo.page').then( m => m.ContactoNuevoPage),
    canActivate: [AuthGuard]
  },
  // Ruta para la pantalla de "Detalle/Edición/Borrado" (Requisito 4)
  {
   path: 'contacto-detalle/:id',
   loadComponent: () => import('./pages/contacto-detalle/contacto-detalle.page').then( m => m.ContactoDetallePage),
   canActivate: [AuthGuard]
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
    redirectTo: 'agenda-contactos' // Redirige a la agenda en lugar de /
  },
];