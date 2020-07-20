import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FarmerApiService } from 'src/app/services/farmer-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  addFormData: FormGroup;
  constructor(private fb: FormBuilder, private farmServ: FarmerApiService, private route: Router) { }

 
  ngOnInit(): void {
    this.addFormData = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      productPrice: ['', Validators.required],
       productDescription: ['', Validators.required],
       productImage: ['', Validators.required]
    });
  }

  onSubmit() {
    this.farmServ.addProduct(this.addFormData.value);
    console.log(this.addFormData.value);
    this.route.navigate(['products']);
   
  }

}
