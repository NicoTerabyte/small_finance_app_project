import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTransactionPage } from './add-transaction.page';

describe('AddTransactionPage', () => {
  let component: AddTransactionPage;
  let fixture: ComponentFixture<AddTransactionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
