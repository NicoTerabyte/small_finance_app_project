import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
		IonCardTitle, IonCardContent, IonItem, IonLabel, IonChip,
		IonSegment, IonSegmentButton, IonIcon } from '@ionic/angular/standalone';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';
import { Observable, map } from 'rxjs';
import Chart from 'chart.js/auto';
import { addIcons } from 'ionicons';
import { closeCircle } from 'ionicons/icons';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.page.html',
  styleUrls: ['./analytics.page.scss'],
  standalone: true,
  imports: [
	CommonModule, FormsModule,
	IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader,
	IonCardTitle, IonCardContent, IonLabel,
	IonSegment, IonSegmentButton, IonChip,
	IonIcon
  ]
})
export class AnalyticsPage implements OnInit, AfterViewInit {
	@ViewChild('balanceCanvas') balanceCanvas!: ElementRef;
	@ViewChild('comparisonCanvas') comparisonCanvas!: ElementRef;

	transactionTypeFilter: 'all' | 'income' | 'expense' | null = null;
	transactions$: Observable<Transaction[]>;
	selectedPeriod: 'week' | 'month' | 'year' = 'month';
	comparisonResult: { isBetter: boolean; percentChange: number } = { isBetter: true, percentChange: 0 };

	selectedPeriodSelected: boolean = false;
	typeSelected: boolean = false;

	private balanceChart!: Chart;
	private comparisonChart!: Chart;

  constructor(private transactionService: TransactionService) {
		this.transactions$ = this.transactionService.transactions$;
		addIcons({ closeCircle });
	}

  ngOnInit() {
	// Inizializzazione base
		this.selectedPeriodSelected = false;
		this.typeSelected = false;
	}

  ngAfterViewInit() {
	// Inizializza i grafici dopo che la vista è pronta
	this.createCharts();
	this.updateAnalytics();
	}

	periodChanged(event: any) {
		this.selectedPeriod = event.detail.value;
		this.selectedPeriodSelected = true;
		this.updateAnalytics();
	}

  private createCharts() {
	// Crea il grafico del bilancio
		this.balanceChart = new Chart(this.balanceCanvas.nativeElement, {
		type: 'line',
		data: {
			labels: [],
			datasets: [{
				label: 'Saldo',
				data: [],
				fill: false,
				borderColor: 'rgba(75, 192, 192, 1)',
				tension: 0.4
			}]
		},
		options: {
			responsive: true,
			scales: {
			y: {
				beginAtZero: false
			}
			}
		}
		});

		// Crea il grafico di confronto
		this.comparisonChart = new Chart(this.comparisonCanvas.nativeElement, {
			type: 'bar',
			data: {
				labels: ['Questo periodo', 'Periodo precedente'],
				datasets: [
				{
					label: 'Entrate',
					data: [0, 0],
					backgroundColor: 'rgba(75, 192, 192, 0.8)'
				},
				{
					label: 'Spese',
					data: [0, 0],
					backgroundColor: 'rgba(255, 99, 132, 0.8)'
				}
				]
			},
			options: {
				responsive: true
			}
		});
	}

	typeFilterChanged(event: any) {
		this.transactionTypeFilter = event.detail.value;
		this.typeSelected = true;  // Imposta a true per nascondere il selettore
		this.updateAnalytics();
	}

	resetTypeFilter() {
		this.typeSelected = false;
		// this.transactionTypeFilter = 'all';
		// this.updateAnalytics();
	}

	getTypeLabel(): string {
		switch(this.transactionTypeFilter) {
			case 'income': return 'Entrate';
			case 'expense': return 'Uscite';
			case 'all': return 'Tutte';
			default: return 'Seleziona tipo';  // Caso per null
		}
	}

	calculateComparison(current: { income: number, expense: number, balance: number },
	previous: { income: number, expense: number, balance: number }) {
		// Evita divisione per zero
		if (previous.balance === 0) {
			this.comparisonResult = { isBetter: current.balance > 0, percentChange: 100 };
			return;
		}

	// Calcola la variazione percentuale
	const change = ((current.balance - previous.balance) / Math.abs(previous.balance)) * 100;

	// Il risultato è positivo se stiamo risparmiando di più o spendendo di meno
		this.comparisonResult = {
			isBetter: change > 0,
			percentChange: Math.abs(change)
		};
  }
  updateAnalytics() {
	this.transactions$.pipe(
		map(transactions => this.processTransactionsData(transactions))
	).subscribe(result => {
		// Aggiorna i dati del grafico del bilancio
		this.balanceChart.data.labels = result.dateLabels;
		this.balanceChart.data.datasets[0].data = result.balanceData;
		this.balanceChart.update();

		// Aggiorna i dati del grafico spese vs entrate
		this.comparisonChart.data.datasets[0].data = [result.currentPeriod.income, result.previousPeriod.income];
		this.comparisonChart.data.datasets[1].data = [result.currentPeriod.expense, result.previousPeriod.expense];
		this.comparisonChart.update();

		// Calcola il confronto
		this.calculateComparison(result.currentPeriod, result.previousPeriod);
	});
  }

	processTransactionsData(transactions: Transaction[]) {
	// Applica il filtro per tipo se necessario
		let filteredTransactions = [...transactions];
			if (this.transactionTypeFilter && this.transactionTypeFilter !== 'all') {
			filteredTransactions = filteredTransactions.filter(
				t => t.type === this.transactionTypeFilter
			);
		}

		// Ordina le transazioni per data (modifica questa riga)
		const sortedTransactions = filteredTransactions.sort((a, b) =>
		new Date(a.date).getTime() - new Date(b.date).getTime()
		);
		// Ordina le transazioni per data

		// Calcola il periodo corrente e quello precedente
		const now = new Date();
		let currentStart: Date;
		let previousStart: Date;

		switch(this.selectedPeriod) {
		case 'week':
			const daysToSubtract = now.getDay() === 0 ? 6 : now.getDay() - 1;
			currentStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - daysToSubtract);
			previousStart = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate() - 7);
			break;
		case 'month':
			currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
			previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
			break;
		case 'year':
			currentStart = new Date(now.getFullYear(), 0, 1);
			previousStart = new Date(now.getFullYear() - 1, 0, 1);
			break;
		default:
			currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
			previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		}

		const previousEnd = new Date(currentStart.getTime() - 1);

		// Filtra le transazioni per periodo
		const currentTransactions = sortedTransactions.filter(t =>
		new Date(t.date) >= currentStart && new Date(t.date) <= now
		);

		const previousTransactions = sortedTransactions.filter(t =>
		new Date(t.date) >= previousStart && new Date(t.date) < currentStart
		);

		// Calcola incassi e spese per ciascun periodo
		const currentPeriod = this.calculatePeriodSummary(currentTransactions);
		const previousPeriod = this.calculatePeriodSummary(previousTransactions);

		// Prepara i dati per il grafico del bilancio
		const dateLabels: string[] = [];
		const balanceData: number[] = [];
		let runningBalance = 0;

		// Genera punti dati basati sul periodo selezionato
		const timePoints = this.generateTimePoints(currentStart, now);

		for (const point of timePoints) {
		dateLabels.push(point.label);

		// Trova transazioni per questo punto temporale
		const pointTransactions = this.getTransactionsForTimePoint(sortedTransactions, point.date, this.selectedPeriod);

		// Calcola il saldo cumulativo
		for (const transaction of pointTransactions) {
			runningBalance += transaction.type === 'income' ? transaction.amount : -transaction.amount;
		}

		balanceData.push(runningBalance);
		}

		return {
		dateLabels,
		balanceData,
		currentPeriod,
		previousPeriod
		};
	}

	private calculatePeriodSummary(transactions: Transaction[]) {
		let income = 0;
		let expense = 0;

		for (const t of transactions) {
		if (t.type === 'income') {
			income += t.amount;
		} else {
			expense += t.amount;
		}
		}

	return { income, expense, balance: income - expense };
  }

  private generateTimePoints(start: Date, end: Date) {
	const points = [];
	const formatter = new Intl.DateTimeFormat('it-IT', {
	  weekday: this.selectedPeriod === 'week' ? 'short' : undefined,
	  day: this.selectedPeriod === 'month' ? 'numeric' : undefined,
	  month: this.selectedPeriod === 'year' ? 'short' : undefined
	});

	if (this.selectedPeriod === 'week') {
	  for (let i = 0; i < 7; i++) {
		const date = new Date(start);
		date.setDate(date.getDate() + i);
		points.push({
		  date,
		  label: formatter.format(date)
		});
	  }
	} else if (this.selectedPeriod === 'month') {
	  const daysInMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate();
	  for (let i = 1; i <= daysInMonth; i++) {
		const date = new Date(start.getFullYear(), start.getMonth(), i);
		points.push({
		  date,
		  label: i.toString()
		});
	  }
	} else {
	  for (let i = 0; i < 12; i++) {
		const date = new Date(start.getFullYear(), i, 1);
		points.push({
		  date,
		  label: formatter.format(date)
		});
	  }
	}

	return points;
  }

  private getTransactionsForTimePoint(transactions: Transaction[], date: Date, period: string) {
	return transactions.filter(t => {
	  const tDate = new Date(t.date);
	  if (period === 'week' || period === 'month') {
		return tDate.getDate() === date.getDate() &&
			   tDate.getMonth() === date.getMonth() &&
			   tDate.getFullYear() === date.getFullYear();
	  } else { // year
		return tDate.getMonth() === date.getMonth() &&
			tDate.getFullYear() === date.getFullYear();
	  }
	});
  }
}
