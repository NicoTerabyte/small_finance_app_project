import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonBadge,
  IonButton, IonSpinner
} from '@ionic/angular/standalone';
import { TransactionService } from '../../services/transaction.service';
import { ApiService, Post } from '../../services/api.service';
import { Transaction } from '../../models/transaction.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonList, IonItem, IonLabel, IonBadge, IonButton, IonSpinner
  ]
})
export class DashboardPage implements OnInit {
  transactions$: Observable<Transaction[]>;
  posts: Post[] = [];
  isLoading = false;
  errorMessage = '';
  showPosts = false;

  constructor(
    private transactionService: TransactionService,
    private apiService: ApiService
  ) {
    this.transactions$ = this.transactionService.transactions$;
  }

  ngOnInit() {
  }

  calculateBalance(transactions: Transaction[]): number {
    return transactions.reduce((total, t) => {
      return total + (t.type === 'income' ? t.amount : -t.amount);
    }, 0);
  }

  loadPosts() {
    this.isLoading = true;
    this.errorMessage = '';
    this.showPosts = true;

    this.apiService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts.slice(0, 5); // Solo primi 5 post per brevità
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Errore nel caricamento dei post: ' + error.message;
        this.isLoading = false;
      }
    });
  }
}
