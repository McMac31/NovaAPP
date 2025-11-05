import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth service/auth.service';
export interface Contacto {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactosService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  

  private apiUrl = `${this.authService.getApiUrl()}/contactos`;

  /**
   * Obtiene la lista completa de contactos.
   * La autenticación la gestiona el authInterceptor.
   * @returns Observable con un array de contactos.
   */
  getContactos(): Observable<Contacto[]> {
    // La API (clientes.py) devuelve un objeto: {"contactos": [...], "Num Contactos": X}
    // Usamos 'any' y deberíamos transformar la respuesta si fuera necesario,
    // pero la API en clientes.py parece devolver la lista directamente en la clave "contactos".
    // Asumimos que la API devuelve { contactos: Contacto[] }
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * Obtiene un contacto específico por su ID.
   * NOTA: Este endpoint (GET /contactos/:id) no está en el clientes.py proporcionado,
   * pero es necesario para la funcionalidad de edición (Requisito 4).
   * Se asume que la API lo implementa.
   * @param id - El ID del contacto.
   * @returns Observable con el contacto.
   */
  getContacto(id: number): Observable<Contacto> {
    return this.http.get<Contacto>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo contacto.
   * @param data - Objeto con 'name' y 'email' del nuevo contacto.
   * @returns Observable con la respuesta del servidor.
   */
  createContacto(data: { name: string, email: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  /**
   * Actualiza un contacto existente por su ID.
   * @param id - El ID del contacto a actualizar.
   * @param data - Objeto con 'name' y/o 'email' a actualizar.
   * @returns Observable con la respuesta del servidor.
   */
  updateContacto(id: number, data: { name?: string, email?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  /**
   * Elimina un contacto por su ID.
   * @param id - El ID del contacto a eliminar.
   * @returns Observable con la respuesta del servidor.
   */
  deleteContacto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}