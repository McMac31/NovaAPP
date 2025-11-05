import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { IonInput, IonItem, IonList, IonHeader, IonButton, IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../auth service/auth.service';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';



@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    imports: [IonInput,IonContent, ReactiveFormsModule ],
})
export class LoginPage{
    
    usuarioForm: FormGroup;
    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router){
        this.usuarioForm = this.fb.group({
            email: [''],
            password: ['']
        });
    }

    async showToast(text='Cargando...',d?:undefined | any) {
        await Toast.show({
            text: text,
            position: 'bottom',
            duration: d,
        });
    }
    
    isLoading: boolean = false;

    async onSubmit(){
        this.isLoading = true;
        await this.showToast()
        const { email, password } = this.usuarioForm.value;
        this.authService.login(email, password).subscribe({
            next: async(res: any) => {
                this.isLoading = false;
                await this.showToast().finally()
                this.authService.saveToken(res.token);  
                setTimeout(async() => {
                   await this.showToast("Sesión iniciada sastifactoriamente.","short")
                   this.router.navigate(['/']); 
                }, 1000);
            },
            error: async(e) => {
                this.isLoading = false;
                await this.showToast(e.error.error).finally()
                this.router.navigate(['auth/login']);
                console.log(e);
            }
        });
    }
}