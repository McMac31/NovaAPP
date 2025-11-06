import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {defineCustomElements} from '@ionic/pwa-elements/loader';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment.prod';
import { authInterceptor } from './app/auth/auth.interceptor'; 

defineCustomElements(window);
if(environment.production){
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // Configurar provideHttpClient para que use el interceptor
    provideHttpClient(withInterceptors([authInterceptor])) 
  ],
});