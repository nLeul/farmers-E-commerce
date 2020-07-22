import { Component, OnInit } from '@angular/core';
import { FarmerApiService } from '../services/farmer-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  pending: [];;
  ready: [];
  complete: [];
  subscription$: Subscription;
  displayedColumns = ['customer_id', 'order_date', 'order_quantity', 'order_status', 'order_total', 'pickup_date', 'Action'];


  constructor(private farmService: FarmerApiService, private router: Router, private route: ActivatedRoute) {
    this.subscription$ = this.farmService.getOrdersByStatus("pending", "ready", "complete").subscribe((order: any) => {

      this.pending = order.data.pending;
      this.ready = order.data.ready;
      this.complete = order.data.complete;
      console.log(this.complete);
    });
  }

  makeReady(orderId) {
    let order_status = "ready";
    let pickup_date = "2020-07-15";
    console.log(orderId);
    console.log(pickup_date);
    this.farmService.readyOrder(orderId, { order_status: order_status, pickup_date: pickup_date }).subscribe(res => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['orders']);
      });
    })
  }

  completeOrder(orderId) {
    console.log("complete order ID: ", orderId)
    let order_status = "complete";
    this.farmService.completeOrder(orderId, { order_status: order_status }).subscribe(res => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['orders']);
      });
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
