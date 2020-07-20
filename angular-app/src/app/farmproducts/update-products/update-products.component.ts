import { Component, OnInit } from '@angular/core';
import { FarmerApiService } from 'src/app/services/farmer-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {
  productList: [];
  editForm: FormGroup;
  prodName: string;
  subscription$: Subscription;
  constructor(private router: Router, private routes: ActivatedRoute, private fb: FormBuilder, private farmService: FarmerApiService) {
    this.editForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      productPrice: ['', Validators.required],
       productDescription: ['', Validators.required],
       productImage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.routes.queryParams.subscribe((param: any) => this.prodName = param['productName']);
    console.log(this.prodName);
    this.farmService.getProductByName(this.prodName).subscribe(res => {
      this.editForm.patchValue(res.data);
    })
  }

  onSubmit() {
    this.subscription$ = this.farmService.getProductByName(this.editForm.value).subscribe(res => {
      console.log("posted succesfully")
    })

  }
}
