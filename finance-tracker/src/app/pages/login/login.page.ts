import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonButton, IonItem, IonInput, IonLabel,
  IonText, IonSpinner
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonButton, IonItem, IonInput, IonLabel,
    IonText, IonSpinner
  ]
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  isSignUp: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async handleAuth() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Per favore inserisci email e password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      if (this.isSignUp) {
        const { error } = await this.authService.signUp(this.email, this.password);
        if (error) throw error;
        this.errorMessage = 'Registrazione completata! Verifica la tua email.';
      } else {
        const { error } = await this.authService.signIn(this.email, this.password);
        if (error) throw error;
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      this.errorMessage = error.message || 'Errore durante l\'autenticazione';
    } finally {
      this.isLoading = false;
    }
  }

  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
  }
}
