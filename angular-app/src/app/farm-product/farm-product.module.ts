import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FarmProductsComponent } from './farm-products/farm-products.component';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';



@NgModule({
  declarations: [FarmProductsComponent, AddProductComponent, UpdateProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "farms", component: FarmProductsComponent },
      { path: "addProduct", component: FarmProductsComponent },
    ])
  ]
})
export class FarmProductModule { }
