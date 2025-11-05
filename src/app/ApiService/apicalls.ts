import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';  
import { AuthService } from '../auth/auth service/auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class Apicalls {
  URL = 'https://apitechsolutions.duckdns.org/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Método privado para obtener headers con token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // MÉTODOS PARA CLIENTES

  getClientes(): Observable<any> {
    return this.http.get(`${this.URL}/clientes`, { headers: this.getHeaders() });
  }

  addCliente(nombre: string, email: string): Observable<any> {
    const body = { nombre, email };
    return this.http.post(`${this.URL}/clientes`, body, { headers: this.getHeaders() });
  }

  actualizarCliente(id: number, valores: any): Observable<any> {
    return this.http.put(`${this.URL}/clientes/${id}`, valores, { headers: this.getHeaders() });
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/clientes/${id}`, { headers: this.getHeaders() });
  }

  //  MÉTODOS PARA CONTACTOS

  getContactos(): Observable<any> {
    return this.http.get(`${this.URL}/contactos`, { headers: this.getHeaders() });
  }

  addContacto(nombre: string, email: string): Observable<any> {
    const body = { nombre, email };
    return this.http.post(`${this.URL}/contactos`, body, { headers: this.getHeaders() });
  }

  actualizarContacto(id: number, valores: any): Observable<any> {
    return this.http.put(`${this.URL}/contactos/${id}`, valores, { headers: this.getHeaders() });
  }

  eliminarContacto(id: number): Observable<any> {
    return this.http.delete(`${this.URL}/contactos/${id}`, { headers: this.getHeaders() });
  }

  // MÉTODOS PARA VENTAS

  getNumVentasMes(mes?: number, year?: number): Observable<any> {
    const params: any = {};
    if (mes) params.mes = mes.toString();
    if (year) params.year = year.toString();
    
    return this.http.get(`${this.URL}/ventas/mes`, { 
      headers: this.getHeaders(),
      params: params
    });
  }

  getDetalleVenta(mes?: number, year?: number): Observable<any> {
    const params: any = {};
    if (mes) params.mes = mes.toString();
    if (year) params.year = year.toString();
    
    return this.http.get(`${this.URL}/ventas/detalle`, { 
      headers: this.getHeaders(),
      params: params
    });
  }

  getTotalFacturado(): Observable<any> {
    return this.http.get(`${this.URL}/ventas/total-facturado`, { headers: this.getHeaders() });
  }

  getPedidosPendientes(): Observable<any> {
    return this.http.get(`${this.URL}/pedidos/pendientes`, { headers: this.getHeaders() });
  }

  getProdStockBajo(): Observable<any> {
    return this.http.get(`${this.URL}/productos/stock-bajo`, { headers: this.getHeaders() });
  }

  getClientesDestacados(): Observable<any> {
    return this.http.get(`${this.URL}/clientes/destacados`, { headers: this.getHeaders() });
  }
}