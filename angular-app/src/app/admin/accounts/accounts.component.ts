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
  accounts;
  subscription$: Subscription;
  constructor(private farmService: FarmerApiService, private router: Router, private route: ActivatedRoute) { 
    this.subscription$ = this.farmService.getAllUsers().subscribe(accounts => {
  
      this.accounts = accounts.data;
   
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
