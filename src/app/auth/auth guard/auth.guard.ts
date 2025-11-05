import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth service/auth.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private router: Router, private authService: AuthService){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        const isAuthenticate: boolean = this.authService.isAuthenticated();
        const targetUrl = state.url;
        if(isAuthenticate && targetUrl.startsWith('/auth/login')){
            this.router.navigate(['/']);
            return false
        }
        if(!isAuthenticate && !targetUrl.startsWith('/auth/login')){
            this.router.navigate(['/auth/login']);
            return false
        }

        return true
    }
}