import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonInput, IonButton, IonIcon, IonAvatar, IonImg, IonNote, 
  IonButtons, IonBackButton 
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Toast } from '@capacitor/toast';
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';
import { ContactosService } from '../../contactos.service';

@Component({
  selector: 'app-contacto-nuevo',
  templateUrl: './contacto-nuevo.page.html',
  styleUrls: ['./contacto-nuevo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem,
    IonInput, IonButton, IonIcon, IonAvatar, IonImg, IonNote, IonButtons,
    IonBackButton
  ]
})
export class ContactoNuevoPage {

  public contactoForm: FormGroup;
  public fotoPreview: string | undefined;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private contactosService = inject(ContactosService);

  constructor() {
    addIcons({ camera });

    this.contactoForm = this.fb.group({
      name: ['', Validators.required],
      apellido: [''],
      email: ['', [Validators.required, Validators.email]],
      posicion: [''],
      foto: [null]
    });
  }

  /**
   * API de Capacitor Camera 
   */
  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl, // Devuelve en Base64
        source: CameraSource.Camera
      });
      this.fotoPreview = image.dataUrl;
      this.contactoForm.patchValue({ foto: image.dataUrl });
    } catch (error) {
      console.error('Error al tomar foto:', error);
      await Toast.show({ text: 'No se pudo tomar la foto.' });
    }
  }

  /**
   * Envía el formulario para crear el nuevo contacto.
   */
  async crearContacto() {
    if (this.contactoForm.invalid) {
      await Toast.show({ text: 'Por favor, complete el nombre y el email.' });
      return;
    }


    const datosParaApi = {
      name: this.contactoForm.value.name,
      email: this.contactoForm.value.email
    };

    this.contactosService.createContacto(datosParaApi).subscribe({
      next: async () => {
        await Toast.show({
          text: 'Contacto creado exitosamente.',
          duration: 'short'
        });
        this.router.navigate(['/agenda-contactos']);
      },
      error: async (err) => {
        console.error('Error al crear contacto:', err);
        const errorMsg = err?.error?.error || 'Error al crear el contacto.';
        await Toast.show({
          text: errorMsg,
          duration: 'long'
        });
      }
    });
  }
}