import { Component, OnInit } from '@angular/core';
import { FarmerApiService } from 'src/app/services/farmer-api.service';
import { Subscription } from 'rxjs';
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


  displayedColumns = ['No', 'productName', 'quantity', 'productPrice', 'productImage', 'Action'];
  dataSource;
  constructor(private farmService: FarmerApiService, private router: Router) { }

  ngOnInit(): void {
    this.subscription$ = this.farmService.getProducts().subscribe(productList => {
      this.productList = productList.data
      console.log(this.productList);
    });
  }
  updateProduct(prodName: string) {
    console.log(prodName);
    // this.farmService.deleteProduct(prodId).subscribe(res => this.router.navigate(['delete']));
    this.router.navigate(['signin','farmers','update'])
    
  }

  deleteProduct(prodId: number) {
    console.log(prodId);
    // this.farmService.deleteProduct(prodId).subscribe(res => this.router.navigate(['delete']));
    this.router.navigate(['signin','farmers','delete'])
    
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}

