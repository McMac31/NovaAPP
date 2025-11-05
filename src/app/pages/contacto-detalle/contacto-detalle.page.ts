import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Contacto, ContactosService } from '../../ContactoService/contactos-service';

@Component({
  selector: 'app-contacto-detalle',
  templateUrl: 'contacto-detalle.page.html',
  styleUrls: ['contacto-detalle.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonList, IonItem, IonLabel]
})
export class ContactoDetallePage implements OnInit {
  private route = inject(ActivatedRoute);
  private contactosService = inject(ContactosService);

  public contacto: Contacto | null = null;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
    if (id !== null) {
      this.contactosService.getContacto(id).subscribe({
        next: (c) => this.contacto = c,
        error: (err) => {
          console.error('Error al obtener contacto:', err);
          this.contacto = null;
        }
      });
    }
  }
}
