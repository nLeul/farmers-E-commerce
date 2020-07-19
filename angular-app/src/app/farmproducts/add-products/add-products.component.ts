import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  addFormData: FormGroup;
  constructor(private fb:FormBuilder) { }

 
  ngOnInit(): void {
    this.addFormData = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      productPrice: ['', Validators.required],
       productDescription: ['', Validators.required],
       productImage: ['', Validators.required]
    });
  }

}
