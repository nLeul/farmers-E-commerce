import { Component, OnInit,OnDestroy } from '@angular/core';
import { FarmerApiService } from 'src/app/services/farmer-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions;
  subscription$: Subscription;
  displayedColumns = ['order_date', 'customer_id','_id', 'order_quantity','order_total', 'order_status'];

  constructor(private farmService: FarmerApiService, private router: Router, private route: ActivatedRoute) { 
    this.subscription$ = this.farmService.getTransactions().subscribe(accounts=> {
      console.log(accounts);
      this.transactions = accounts.data;
   
    })
  }

  ngOnInit(): void {
  
  }
  onSubmit() {
this.farmService.register
}
  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
