import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth service/auth.service';

/**
 * Interceptor funcional de autenticación.
 * Añade la cabecera 'Authorization' con el token a todas las solicitudes.
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Si no hay token, o si es la propia petición de login, no se modifica
  if (!token || req.url.includes('/login')) {
    return next(req);
  }

  // Clonar la solicitud y añadir la cabecera
  const reqClonada = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(reqClonada);
};