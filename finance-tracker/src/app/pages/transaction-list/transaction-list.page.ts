import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
  IonLabel, IonBadge, IonIcon, IonItemSliding, IonItemOptions,
  IonItemOption, IonCard, IonCardHeader, IonCardTitle, IonSegment,
  IonSegmentButton, IonSelect, IonSelectOption, IonButton
} from '@ionic/angular/standalone';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { Observable, map } from 'rxjs';
import { addIcons } from 'ionicons';
import { trash, swapVertical, funnel } from 'ionicons/icons';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.page.html',
  styleUrls: ['./transaction-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar,
    IonList, IonItem, IonLabel, IonBadge, IonIcon, IonItemSliding,
    IonItemOptions, IonItemOption, IonCard, IonCardHeader, IonCardTitle,
    IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonButton
  ]
})
export class TransactionListPage implements OnInit {
  transactions$: Observable<Transaction[]>;
  filteredTransactions$: Observable<Transaction[]>;

  // Opzioni di filtro
  filterType: string = 'all'; // 'all', 'expense', 'income'
  sortDirection: string = 'desc'; // 'asc', 'desc'

  constructor(private transactionService: TransactionService) {
    this.transactions$ = this.transactionService.transactions$;
    this.filteredTransactions$ = this.transactions$;
    addIcons({ trash, swapVertical, funnel });
    this.applyFilters();
  }

  ngOnInit() {
  }

  deleteTransaction(id: string) {
    this.transactionService.deleteTransaction(id);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  // Applica i filtri selezionati
  applyFilters() {
    this.filteredTransactions$ = this.transactions$.pipe(
      map(transactions => {
        // Filtra per tipo
        let filtered = transactions;
        if (this.filterType === 'expense') {
          filtered = filtered.filter(t => t.type === 'expense');
        } else if (this.filterType === 'income') {
          filtered = filtered.filter(t => t.type === 'income');
        }

        // Ordina per importo
        filtered = [...filtered].sort((a, b) => {
          return this.sortDirection === 'asc'
            ? a.amount - b.amount
            : b.amount - a.amount;
        });

        return filtered;
      })
    );
  }

  // Cambia il tipo di filtro
  segmentChanged(event: any) {
    this.filterType = event.detail.value;
    this.applyFilters();
  }

  // Inverti l'ordine di ordinamento
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }
}
