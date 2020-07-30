import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './accounts/accounts.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { RouterModule } from '@angular/router';


import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [AccountsComponent, TransactionsComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'accounts', component: AccountsComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'changePassword', component: ChangePasswordComponent }
    ]),

  MatTableModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule

  ],

})
export class AdminModule { }
