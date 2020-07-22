import { Component, OnInit, DoCheck } from '@angular/core';
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
    this.farmService.getLoggedInUser().subscribe(res => {
      console.log("logged in user", res);
      this.farmerId = res.user._id;

    });
    this.subscription$ = this.farmService.getProducts(this.farmerId).subscribe((prod: any) => {
      console.log("products",prod);
      this.productList = prod.data
    });

  }

  ngOnInit(): void {

  }





  deleteProduct(prodId: number) {
    this.farmService.deleteProduct(prodId).subscribe(res => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['products']);
    }); 
    });
   
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}

