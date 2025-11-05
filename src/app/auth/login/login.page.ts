import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// Importaciones de componentes Ionic Standalone
import { IonInput, IonContent, IonButton, IonItem, IonList } from '@ionic/angular/standalone';
import { AuthService } from '../auth service/auth.service';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { CommonModule } from '@angular/common'; // Necesario para directivas

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: true, // Asegurarse de que es standalone
    imports: [
      CommonModule,
      ReactiveFormsModule,
      IonInput,
      IonContent,
      IonButton, // Añadido para ion-button
      IonItem,   // Añadido para ion-item
      IonList    // Añadido para ion-list
    ],
})
export class LoginPage {
    
    usuarioForm: FormGroup;
    
    constructor(
      private fb: FormBuilder, 
      private authService: AuthService, 
      private router: Router
    ) {
        this.usuarioForm = this.fb.group({
            // Se recomienda usar 'username' como en la API (clientes.py) o ajustar la API
            // Usaremos 'email' como está en el HTML, pero lo enviaremos como 'username'
            email: [''], // El HTML usa formControlName="email"
            password: ['']
        });
    }

    /**
     * Muestra un Toast nativo.
     * @param text - Mensaje a mostrar.
     * @param d - Duración ('short' o 'long').
     */
    async showToast(text = 'Cargando...', d: 'short' | 'long' = 'short') {
        await Toast.show({
            text: text,
            position: 'bottom',
            duration: d,
        });
    }
    
    isLoading: boolean = false;

    async onSubmit() {
        if (this.usuarioForm.invalid) {
          return;
        }
      
        this.isLoading = true;
        await this.showToast('Iniciando sesión...');
        
        // El formulario usa 'email' pero la API (auth.service) espera 'username'
        // Asumimos que el 'email' se usa como 'username'
        const { email, password } = this.usuarioForm.value;

        this.authService.login(email, password).subscribe({
            next: async (res: any) => {
                this.isLoading = false;
                // Asumimos que la respuesta tiene una propiedad 'token'
                if (res && res.token) {
                  this.authService.saveToken(res.token);  
                  await this.showToast("Sesión iniciada sastifactoriamente.", "short");
                  this.router.navigate(['/']); // Redirige a la página principal (agenda-contactos)
                } else {
                  // Manejar respuesta inesperada sin token
                  await this.showToast("Respuesta de login inválida.", "long");
                }
            },
            error: async (e) => {
                this.isLoading = false;
                // Muestra el error específico de la API si está disponible
                const errorMsg = e?.error?.error || 'Error desconocido al iniciar sesión.';
                await this.showToast(errorMsg, "long");
                console.error(e);
            }
        });
    }
}