import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://apitechsolutions.duckdns.org/api';
    constructor(private http: HttpClient, private router: Router) { }

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

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}