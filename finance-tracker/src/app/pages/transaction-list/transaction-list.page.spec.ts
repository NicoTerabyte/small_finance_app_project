import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListPage } from './transaction-list.page';

describe('TransactionListPage', () => {
  let component: TransactionListPage;
  let fixture: ComponentFixture<TransactionListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
