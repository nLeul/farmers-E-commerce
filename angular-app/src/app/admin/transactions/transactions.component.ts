import { Component, OnInit,OnDestroy } from '@angular/core';
import { FarmerApiService } from 'src/app/services/farmer-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any;
  subscription$: Subscription;

  constructor(private farmService: FarmerApiService, private router: Router, private route: ActivatedRoute) {
    
//     this.subscription$ = this.farmService.getOrdersByStatus("pending", "ready", "complete").subscribe(orders => {
//       this.transactions = orders.data;
// })
   }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.subscription$.unsubscribe();
}
}
