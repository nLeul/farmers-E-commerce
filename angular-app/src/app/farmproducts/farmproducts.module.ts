import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { DeleteProductsComponent } from './delete-products/delete-products.component';
import { UpdateProductsComponent } from './update-products/update-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';


import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProductsComponent, AddProductsComponent, DeleteProductsComponent, UpdateProductsComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'farmers', component: ProductsComponent },
      { path: 'farmers/details', component: ProductDetailsComponent },
      { path: 'farmers/delete', component: DeleteProductsComponent },
      { path: 'farmers/update', component: UpdateProductsComponent }
    ]),

    MatTableModule,MatFormFieldModule,MatInputModule,MatButtonModule
  ]
})
export class FarmproductsModule { }
