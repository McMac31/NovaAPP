import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, 
  IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonAvatar, IonNote,
  IonButtons, IonButton // <-- CORRECCIÓN: Componentes añadidos
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, logOutOutline } from 'ionicons/icons';
import { Contacto, ContactosService } from '../../ContactoService/contactos-service';
import { AuthService } from '../../auth/auth service/auth.service';

@Component({
  selector: 'app-agenda-contactos',
  templateUrl: 'agenda-contactos.page.html',
  styleUrls: ['agenda-contactos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonSearchbar, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonFab, 
    IonFabButton, 
    IonIcon, 
    IonAvatar, 
    IonNote,
    IonButtons, // <-- CORRECCIÓN: Componente importado
    IonButton   // <-- CORRECCIÓN: Componente importado
  ]
})
export class AgendaContactosPage implements OnInit {
  
  // Lista completa de contactos obtenida de la API
  private contactosCompletos: Contacto[] = [];
  // Lista de contactos filtrados para mostrar en la UI
  public contactosFiltrados: Contacto[] = [];

  // Inyección de servicios y router
  private router = inject(Router);
  private contactosService = inject(ContactosService);
  private authService = inject(AuthService);

  constructor() {
    // Añade los iconos que se usarán en esta página
    addIcons({ add, logOutOutline });
  }

  ngOnInit() {
    // No es necesario cargar aquí, ionViewWillEnter lo hará
  }

  /**
   * Método del ciclo de vida de Ionic.
   * Se dispara cada vez que la vista está a punto de entrar.
   */
  ionViewWillEnter() {
    this.cargarContactos();
  }

  /**
   * Carga la lista de contactos desde el servicio.
   */
  cargarContactos() {
    this.contactosService.getContactos().subscribe({
      next: (response: any) => {
        // Asumiendo que la API devuelve { contactos: [...] }
        this.contactosCompletos = response.contactos || [];
        this.contactosFiltrados = [...this.contactosCompletos];
      },
      error: (err) => {
        console.error('Error al cargar contactos:', err);
      }
    });
  }

  /**
   * Filtra la lista de contactos (Requisito 2).
   */
  onBuscar(event: any) {
    const query = (event.target.value || '').toLowerCase();

    if (!query) {
      this.contactosFiltrados = [...this.contactosCompletos];
      return;
    }

    this.contactosFiltrados = this.contactosCompletos.filter(c =>
      (c.name && c.name.toLowerCase().includes(query)) ||
      (c.email && c.email.toLowerCase().includes(query))
    );
  }

  /**
   * Navega a la pantalla de detalle/edición de un contacto (Requisito 2).
   */
  verDetalle(id: number) {
    this.router.navigate(['/contacto-detalle', id]);
  }

  /**
   * Navega a la pantalla de creación de contacto (Requisito 2).
   */
  irCrear() {
    this.router.navigate(['/contacto-nuevo']);
  }

  /**
   * Cierra la sesión del usuario.
   */
  doLogout() {
    this.authService.logout();
  }
}