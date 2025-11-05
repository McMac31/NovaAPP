import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-contacto-nuevo',
  templateUrl: 'contacto-nuevo.page.html',
  styleUrls: ['contacto-nuevo.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonHeader, IonToolbar, IonTitle, IonButton]
})
export class ContactoNuevoPage {
  // Minimal page - form can be implemented later
}
