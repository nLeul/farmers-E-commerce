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
  farmer_id;
    constructor(private fb: FormBuilder, private farmServ: FarmerApiService, private route: Router) { 
      this.farmServ.getLoggedInUser().subscribe(res => {
        console.log("res",res)
        this.farmer_id = res.user._id;
        console.log('farmer ID:',this.farmer_id)  
      })
  }

 
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
    let formValue=this.addFormData.value
    let body = { ...formValue, farmer_id :this.farmer_id };
    console.log(body);
    this.farmServ.addProduct(body).subscribe(res => {
      console.log(res)
      this.route.navigate(['products']);
    });
  
    
   
  }

}
