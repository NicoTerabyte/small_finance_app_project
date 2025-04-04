import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'add-transaction',
    loadComponent: () => import('./pages/add-transaction/add-transaction.page').then( m => m.AddTransactionPage)
  },
  {
    path: 'transaction-list',
    loadComponent: () => import('./pages/transaction-list/transaction-list.page').then( m => m.TransactionListPage)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/analytics/analytics.page').then( m => m.AnalyticsPage)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.page').then( m => m.SettingsPage)
  },
];
