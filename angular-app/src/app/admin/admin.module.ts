import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AccountsComponent, TransactionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'accounts', component: AccountsComponent },
      { path: 'transactions', component: TransactionsComponent }
    ])
  ]
})
export class AdminModule { }
