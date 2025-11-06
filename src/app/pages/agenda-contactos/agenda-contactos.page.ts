import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, 
  IonSearchbar, IonButton, IonLabel, IonAvatar, IonItem, 
  IonNote, IonList, IonFab, IonFabButton, IonButtons,IonImg
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, logOutOutline, personCircleOutline } from 'ionicons/icons';
import { Contacto, ContactosService } from '../../contactos.service';
import { AuthService } from '../../auth/auth service/auth.service';

@Component({
    selector: 'app-agenda-contactos',
    templateUrl: 'agenda-contactos.page.html',
    styleUrls: ['agenda-contactos.page.scss'],
    standalone: true,
    imports: [
      IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, 
      IonIcon, IonSearchbar, IonButton, IonLabel, IonAvatar, IonItem, 
      IonNote, IonList, IonFab, IonFabButton, IonButtons,IonImg
    ]
})

export class AgendaContactosPage implements OnInit {
    
    private router = inject(Router);
    private contactosService = inject(ContactosService);
    private authService = inject(AuthService);

    public contactosCompletos: Contacto[] = [];
    public contactosFiltrados: Contacto[] = [];

    constructor() {
      addIcons({ add, logOutOutline, personCircleOutline });
    }

    ngOnInit() { }

    ionViewWillEnter() {
      this.cargarContactos();
    }

    cargarContactos() {
      this.contactosService.getContactos().subscribe({
        next: (response) => {
          this.contactosCompletos = response.contactos || [];
          this.contactosFiltrados = [...this.contactosCompletos];
        },
        error: (err) => {
          console.error('Error al cargar contactos:', err);
          if (err.status === 401) {
            this.authService.logout();
          }
        }
      });
    }

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

    verDetalle(id: number) {
      this.router.navigate(['/contacto-detalle', id]);
    }

    irCrear() {
      this.router.navigate(['/contacto-nuevo']);
    }

    doLogout() {
      this.authService.logout();
    }
}