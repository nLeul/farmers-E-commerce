import { Component, OnInit,OnDestroy } from '@angular/core';
import { FarmerApiService } from 'src/app/services/farmer-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: any;
  userId: any;
  subscription$: Subscription;

  displayedColumns = ['_id', 'firstname', 'lastname', 'role', 'phone_number', 'Action'];

  constructor(private farmService: FarmerApiService, private router: Router, private route: ActivatedRoute) { 
    this.subscription$ = this.farmService.getAllUsers().subscribe(orders => {
      this.accounts = orders.data;
    })
    

  }
  changePassword(id){
// this.subscription$=this.farmService.ch
    this.router.navigate(['admin','changePassword'],{queryParams:{accountId:id}});
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.subscription$.unsubscribe();
}
}
