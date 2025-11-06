import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth service/auth.service';

// Interfaz para la estructura de datos de un Contacto
export interface Contacto {
  id: number;
  name: string;
  email: string;
  foto?: string; 
  apellido?: string;
  posicion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  
  // Obtiene la URL de la API desde el AuthService
  private apiUrl = `${this.authService.getApiUrl()}/contactos`; //

  /**
   * Obtiene la lista completa de contactos.
   */
  getContactos(): Observable<{contactos: Contacto[], "Num Contactos": number}> {
    return this.http.get<{contactos: Contacto[], "Num Contactos": number}>(this.apiUrl); //
  }

  /**
   * Obtiene un contacto específico por su ID.
   */
  getContacto(id: number): Observable<Contacto> {
     return this.http.get<Contacto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo contacto.
   */
  createContacto(data: { name: string, email: string }): Observable<any> {
    return this.http.post(this.apiUrl, data); //
  }

  /**
   * Actualiza un contacto existente por su ID.
   */
  updateContacto(id: number, data: { name?: string, email?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data); //
  }

  /**
   * Elimina un contacto por su ID.
   */
  deleteContacto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); //
  }
}