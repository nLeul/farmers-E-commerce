import { Component, OnInit,DoCheck } from '@angular/core';
import { FarmerApiService } from 'src/app/services/farmer-api.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  formData;
  productList: [];
  subscription$: Subscription;
  farmerId;


  displayedColumns = ['No', 'productName', 'quantity', 'productPrice', 'productImage', 'Action'];
  dataSource;
  user: any;
  constructor(private farmService: FarmerApiService, private router: Router) { 
    this.farmService.getLoggedInUser().subscribe(u => {
      this.user = u;
      console.log('user:',u, this.user)
    });
    this.subscription$ = this.farmService.getProducts().subscribe((prod:any) => {
      this.productList = prod.data
      // this.farmerId=prod.data[0].farmer_id
      // console.log(this.farmerId);
    });
   
  }

  ngOnInit(): void {
   
  }

  
 


  deleteProduct(prodId: number) {
    console.log(prodId);
    // this.farmService.deleteProduct(prodId).subscribe(res => this.router.navigate(['delete']));
    this.router.navigate(['products','delete'])
   
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}

