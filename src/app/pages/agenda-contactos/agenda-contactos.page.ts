import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader,IonCard, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonSearchbar, IonCol, IonButton, IonSegment, IonSegmentButton, IonLabel, IonAvatar, IonItem, IonNote, IonList, IonFab, IonFabButton } from '@ionic/angular/standalone';

@Component({
    selector: 'app-agenda-contactos',
    templateUrl: 'agenda-contactos.page.html',
    styleUrls: ['agenda-contactos.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle,IonCard, IonToolbar, CommonModule, FormsModule, IonIcon, IonGrid, IonRow, IonSearchbar, IonCol, IonButton, IonSegment, IonSegmentButton, IonLabel, IonAvatar, IonItem, IonNote, IonList, IonFab, IonFabButton]
})
export class AgendaContactosPage {
    clientes: any[] = []; // Lista completa
    clientesFiltrados: any[] = []; // Lista filtrada
    etiquetaSeleccionada: string = '';

    constructor() { }

    // 🔍 Buscar por nombre o email
    onBuscar(event: any) {
        const query = event.target.value.toLowerCase();
        this.clientesFiltrados = this.clientes.filter(c =>
            c.name.toLowerCase().includes(query) || c.email.toLowerCase().includes(query)
        );
    }

    // 🏷️ Aplicar filtro por etiqueta
    aplicarEtiqueta(valor: string | undefined) {
        if (!valor) valor = '';
        // continuar con lógica
    }

    // 👁️ Ver detalle del contacto
    verDetalle(cliente: any) {
        console.log('Ver detalle de:', cliente);
        // Aquí podrías navegar a otra página o mostrar un modal
    }

    // ➕ Ir a crear nuevo contacto
    irCrear() {
        console.log('Ir a crear nuevo contacto');
        // Aquí podrías navegar a una página de creación
    }


}
