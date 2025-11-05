import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { 
  IonInput, IonItem, IonList, IonHeader, IonButton, IonContent,
  IonToolbar, IonTitle // <-- CORRECCIÓN: Componentes añadidos
} from '@ionic/angular/standalone';
import { AuthService } from '../auth service/auth.service';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { CommonModule } from '@angular/common'; // <-- CORRECCIÓN: Añadido

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: true,
    // CORRECCIÓN: Se añaden todos los componentes Ionic usados en el HTML
    imports: [
      CommonModule,
      ReactiveFormsModule,
      IonInput,
      IonContent,
      IonButton,
      IonItem,
      IonList,
      IonHeader,
      IonToolbar, // <-- Añadido
      IonTitle    // <-- Añadido
    ],
})
export class LoginPage{
    
    usuarioForm: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
        this.usuarioForm = this.fb.group({
            email: [''],
            password: ['']
        });
    }

    async showToast(text='Cargando...', d: 'short' | 'long' = 'short') {
        await Toast.show({
            text: text,
            position: 'bottom',
            duration: d,
        });
    }
    
    isLoading: boolean = false;

    async onSubmit(){
        if (this.usuarioForm.invalid) {
          await this.showToast('Formulario inválido.', 'short');
          return;
        }

        this.isLoading = true;
        await this.showToast('Iniciando sesión...');
        
        const { email, password } = this.usuarioForm.value;

        this.authService.login(email, password).subscribe({
            next: async(res: any) => {
                this.isLoading = false;
                
                if (res && res.token) {
                  this.authService.saveToken(res.token);  
                  await this.showToast("Sesión iniciada sastifactoriamente.", "short");
                  this.router.navigate(['/']); 
                } else {
                  await this.showToast("Respuesta de login inválida.", "long");
                }
            },
            error: async(e) => {
                this.isLoading = false;
                const errorMsg = e?.error?.error || 'Error desconocido al iniciar sesión.';
                await this.showToast(errorMsg, "long");
                console.error(e);
            }
        });
    }
}