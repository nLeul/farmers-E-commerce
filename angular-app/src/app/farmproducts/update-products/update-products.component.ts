import { Component, OnInit } from '@angular/core';
import { FarmerApiService } from 'src/app/services/farmer-api.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {
  productList: [];
  editForm: FormGroup;
  prodId: string;
  farmer_id: string;
  subscription$: Subscription;
  constructor(private router: Router, private routes: ActivatedRoute, private fb: FormBuilder, private farmService: FarmerApiService) {
    this.farmService.getLoggedInUser().subscribe(res => {
      console.log("res", res)
      this.farmer_id = res.user._id;
      console.log('farmer ID:', this.farmer_id)
    })
    this.editForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      productPrice: ['', Validators.required],
      productDescription: ['', Validators.required],
      productImage: ['', Validators.required]
    });


  }

  ngOnInit(): void {

    this.routes.paramMap.pipe(
      flatMap(
        (params: ParamMap) => of(params.get("productId")))
    ).subscribe(id => {
      this.prodId = id;
    }
    )
    this.farmService.getProductById(this.prodId).subscribe(res => {
      this.editForm.patchValue(res.data);
    })
  }

  onSubmit() {

    let formValue = this.editForm.value;
    let body = { ...formValue, farmer_id: this.farmer_id };
    this.subscription$ = this.farmService.editProduct(this.prodId,body).subscribe(res => {
      this.router.navigate(['products'])
    })

  }
}
