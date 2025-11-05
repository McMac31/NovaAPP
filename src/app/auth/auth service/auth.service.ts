import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://apitechsolutions.duckdns.org/api';
    
    constructor(private http: HttpClient, private router: Router) { }

    /**
     * Devuelve la URL base de la API.
     */
    getApiUrl(): string {
        return this.apiUrl;
    }

    login(username: string, password: string) {
        const headers = {
            'Content-Type': 'application/json'
        };
        return this.http.post(`${this.apiUrl}/login`, { username, password }, { headers });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/auth/login']);
    }

    saveToken(token: string) {
        localStorage.setItem('token', token);
    }

    /**
     * Obtiene el token de autenticación desde localStorage.
     */
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}