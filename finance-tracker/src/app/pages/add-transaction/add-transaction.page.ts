import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem,
         IonInput, IonSelect, IonSelectOption, IonButton,
         IonCard } from '@ionic/angular/standalone';  // Rimossi IonLabel e IonDatetime
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar,
           IonList, IonItem, IonInput, IonSelect, IonSelectOption,
           IonButton, IonCard]  // Rimossi IonLabel e IonDatetime
})
export class AddTransactionPage {
  transaction = {
    id: '',
    amount: 0,
    description: '',
    date: new Date().toISOString(),
    category: '',
    type: 'expense' as 'income' | 'expense'
  };

  categories = ['Alimentari', 'Trasporti', 'Abitazione', 'Svago', 'Salute', 'Lavoro', 'Altro'];

  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.transaction = {
      id: '',
      amount: 100, // Valore di test
      description: 'Test', // Valore di test
      date: new Date().toISOString(),
      category: 'Altro', // Valore di test
      type: 'expense' as 'income' | 'expense'
    };
  }

  addTransaction() {
    if (this.isValidTransaction()) {
      this.transaction.id = Date.now().toString();
      this.transactionService.addTransaction({
        ...this.transaction,
        date: new Date(this.transaction.date)
      });

      // Resetta il form e naviga alla dashboard
      this.resetForm();
      this.router.navigate(['/dashboard']);
    }
  }

  isValidTransaction(): boolean {
    return this.transaction.amount > 0 &&
           this.transaction.description.trim() !== '' &&
           this.transaction.category !== '';
  }

  resetForm() {
    this.transaction = {
      id: '',
      amount: 0,
      description: '',
      date: new Date().toISOString(),
      category: '',
      type: 'expense' as 'income' | 'expense'
    };
  }
}
