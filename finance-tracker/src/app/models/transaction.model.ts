export interface Transaction{
	id: string;
	amount: number;
	description: string;
	date: Date;
	category: string;
	type: 'income' | 'expense';
}
