import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth service/auth.service';

/**
 * Interceptor funcional de autenticación.
 * Se ejecuta en cada solicitud HTTP, inyecta el AuthService para obtener el token
 * y clona la solicitud para añadir la cabecera 'Authorization' si el token existe.
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // Inyecta el servicio de autenticación
  const authService = inject(AuthService);
  // Obtiene el token de autenticación
  const token = authService.getToken();

  // Si no hay token, simplemente deja pasar la solicitud original
  if (!token) {
    return next(req);
  }

  // Si hay token, clona la solicitud y añade la cabecera de autorización
  const reqClonada = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  // Pasa la solicitud clonada al siguiente manejador
  return next(reqClonada);
};