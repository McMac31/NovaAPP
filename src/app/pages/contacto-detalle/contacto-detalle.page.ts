import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonInput, IonButton, IonIcon, IonAvatar, IonImg, IonNote, 
  IonButtons, IonBackButton, AlertController, IonSpinner, IonItemDivider, IonLabel
} from '@ionic/angular/standalone';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Toast } from '@capacitor/toast';
import { addIcons } from 'ionicons';
import { camera, trash, locationSharp, save } from 'ionicons/icons';
import { Contacto, ContactosService } from '../../contactos.service';

@Component({
  selector: 'app-contacto-detalle',
  templateUrl: './contacto-detalle.page.html',
  styleUrls: ['./contacto-detalle.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, 
    IonContent, IonList, IonItem, IonInput, IonButton, IonIcon, IonAvatar, 
    IonImg, IonNote, IonButtons, IonBackButton, IonSpinner, IonItemDivider, IonLabel
  ]
})
export class ContactoDetallePage implements OnInit {

  public contactoForm: FormGroup;
  public fotoPreview: string | undefined;
  public geolocalizacion: string | undefined;
  
  private contactoId: number | null = null;
  public isLoading = true;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private contactosService = inject(ContactosService);
  private alertController = inject(AlertController);

  constructor() {
    addIcons({ camera, trash, locationSharp, save });

    this.contactoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      apellido: [''],
      posicion: [''],
      foto: [null]
    });
  }

  ngOnInit() { }

  /**
   * Carga los datos del contacto cuando la vista va a entrar.
   */
  ionViewWillEnter() {
    this.isLoading = true;
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (!idParam) {
      this.handleLoadError('ID de contacto inválido.');
      return;
    }
    this.contactoId = +idParam;
    
    // --- CORRECCIÓN ---
    // Ahora la llamada directa funciona gracias a la API actualizada.
    // Ya no necesitamos el fallback.
    this.contactosService.getContacto(this.contactoId).subscribe({
      next: (contacto: Contacto) => {
        if (contacto) {
          this.poblarFormulario(contacto);
        } else {
          this.handleLoadError('Contacto no encontrado.');
        }
      },
      error: (err) => {
        this.handleLoadError('No se pudo cargar el contacto.');
        console.error(err);
      }
    });
  }

  /**
   * Rellena el formulario con los datos del contacto.
   */
  poblarFormulario(contacto: Contacto) {
    this.contactoForm.patchValue({
      name: contacto.name,
      email: contacto.email,
    });
    // Si la API devuelve la foto (Base64), la mostramos
    if (contacto.foto) {
      this.fotoPreview = `data:image/jpeg;base64,${contacto.foto}`;
    }
    this.isLoading = false;
  }

  async handleLoadError(mensaje: string) {
    this.isLoading = false;
    await Toast.show({ text: mensaje, duration: 'long' });
    this.router.navigate(['/agenda-contactos']);
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90, allowEditing: false,
        resultType: CameraResultType.DataUrl, source: CameraSource.Camera
      });
      // fotoPreview ahora tiene el DataUrl (con prefijo)
      this.fotoPreview = image.dataUrl; 
    } catch (error) {
      console.error('Error al tomar foto:', error);
      await Toast.show({ text: 'No se pudo tomar la foto.' });
    }
  }

  async obtenerGeolocalizacion() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.geolocalizacion = `Lat: ${coordinates.coords.latitude.toFixed(4)}, Lon: ${coordinates.coords.longitude.toFixed(4)}`;
      await Toast.show({ text: 'Geolocalización obtenida.', duration: 'short' });
    } catch (error) {
      console.error('Error al obtener geolocalización:', error);
      await Toast.show({ text: 'No se pudo obtener la geolocalización.' });
    }
  }

  /**
   * Actualiza los datos del contacto (Requisito 4).
   */
  async actualizarContacto() {
    if (this.contactoForm.invalid || !this.contactoId) return;

    const datosParaApi: Partial<Contacto> = {
      name: this.contactoForm.value.name,
      email: this.contactoForm.value.email,
      apellido: this.contactoForm.value.apellido,
      posicion: this.contactoForm.value.posicion
    };

    // Si se tomó una foto nueva (this.fotoPreview tendrá el dataUrl)
    if (this.fotoPreview && this.fotoPreview.startsWith('data:image')) {
      // Limpiamos el prefijo 'data:image/jpeg;base64,'
      datosParaApi.foto = this.fotoPreview.split(',')[1];
    }
    
    this.contactosService.updateContacto(this.contactoId, datosParaApi).subscribe({
      next: async () => {
        await Toast.show({ text: 'Contacto actualizado.', duration: 'short' });
      },
      error: async (err) => {
        const errorMsg = err?.error?.error || 'Error al actualizar.';
        await Toast.show({ text: errorMsg, duration: 'long' });
      }
    });
  }

  /**
   * Muestra confirmación y elimina el contacto (Requisito 4).
   */
  async eliminarContacto() {
    if (!this.contactoId) return;

    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de que desea eliminar a ${this.contactoForm.value.name}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => this.ejecutarEliminacion()
        }
      ]
    });
    await alert.present();
  }

  private ejecutarEliminacion() {
    if (!this.contactoId) return;

    this.contactosService.deleteContacto(this.contactoId).subscribe({
      next: async () => {
        await Toast.show({ text: 'Contacto eliminado.', duration: 'short' });
        this.router.navigate(['/agenda-contactos']);
      },
      error: async (err) => {
        const errorMsg = err?.error?.error || 'Error al eliminar.';
        await Toast.show({ text: errorMsg, duration: 'long' });
      }
    });
  }
}