import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  //* BehaviorSubject è un tipo speciale di Observable che mantiene l'ultimo valore
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  // Esponiamo solo l'Observable, così i componenti non possono modificare i dati direttamente
  public transactions$ = this.transactionsSubject.asObservable();

  //riempiamo la classe con qualche esempio base
  constructor() {
   this.addTransaction({
      id : '1',
      amount: 50.0,
      description: "spesa al supermercato",
      date: new Date(),
      category:"alimentari",
      type:"expense"
    });

    this.addTransaction({
      id: '2',
      amount: 1200.0,
      description: 'Stipendio',
      date: new Date(),
      category: 'Lavoro',
      type: 'income'
    });
  }

  addTransaction(transaction: Transaction): void {
    const currentTransactions = this.transactionsSubject.getValue();
    this.transactionsSubject.next([...currentTransactions, transaction]);
  }

  deleteTransaction(id: string): void {
    const currentTransactions = this.transactionsSubject.getValue();
    this.transactionsSubject.next(
      currentTransactions.filter(transaction => transaction.id !== id)
    );
  }
}
