import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import {
  IonApp,
  IonContent,
  IonIcon,
  IonButton,
  IonButtons,
  IonToolbar,
  IonFooter,
  IonRouterOutlet // Aggiungi questa importazione
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { list, addCircle, home, analytics, settings } from 'ionicons/icons';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    RouterLink,
    IonApp,
    IonContent,
    IonIcon,
    IonButton,
    IonButtons,
    IonToolbar,
    IonFooter,
    IonRouterOutlet // Aggiungi anche qui
  ],
})
export class AppComponent {
  isLoggedIn$ = this.authService.currentUser$.pipe(map(user => !!user));

  constructor(private authService: AuthService) {
    addIcons({ list, addCircle, home, analytics, settings });
  }
}
