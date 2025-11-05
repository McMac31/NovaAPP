import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL base de la API
  private apiUrl = 'https://apitechsolutions.duckdns.org/api';

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Devuelve la URL base de la API.
   * @returns La URL de la API.
   */
  getApiUrl(): string {
    return this.apiUrl;
  }

  /**
   * Envía las credenciales al endpoint de login de la API.
   * @param username - Nombre de usuario (email).
   * @param password - Contraseña.
   * @returns Observable con la respuesta del servidor (que debe incluir el token).
   */
  login(username: string, password: string) {
    const headers = {
      'Content-Type': 'application/json'
    };
    // El endpoint de login no requiere el token de autorización
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { headers });
  }

  /**
   * Elimina el token de localStorage y redirige a la pantalla de login.
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  /**
   * Guarda el token de autenticación en localStorage.
   * @param token - El token JWT recibido del servidor.
   */
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   * Obtiene el token de autenticación desde localStorage.
   * @returns El token almacenado, o null si no existe.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Verifica si el usuario está autenticado (si existe un token).
   * @returns boolean - True si el token existe, false en caso contrario.
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}