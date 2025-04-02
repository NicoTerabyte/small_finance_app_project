import { Component } from '@angular/core';
import { IonApp, IonContent, IonFooter, IonToolbar, IonButtons, IonButton, IonIcon, IonRouterOutlet } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Aggiungi questa riga
import { addIcons } from 'ionicons';
import { home, addCircle, list, analytics, settings } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp,
    IonContent,
    IonFooter,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonRouterOutlet,
    FormsModule,
    RouterModule  // Aggiungi questa riga
  ],
})

export class AppComponent {
  constructor() {
    addIcons({home, addCircle, list, analytics, settings})
  }
}
