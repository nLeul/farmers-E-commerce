import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'

interface IProducts {
  success: boolean,
  data: []
}

@Injectable({
  providedIn: 'root'
})
export class FarmerApiService {

  constructor(private http: HttpClient) { }

  getProducts() {
   return this.http.get<IProducts>('http://localhost:3000/api/v1/users/products');
  }
  deleteProduct(prodId) {
   return this.http.delete<IProducts>(`http://localhost:3000/api/v1/users/products/${prodId}`);
  }
  editProduct(prodId,formData) {
   return this.http.patch<IProducts>(`http://localhost:3000/api/v1/users/products/${prodId}`,formData); 
  }
  getProductByName(prodName) {
    return this.http.get<IProducts>(`http://localhost:3000/api/v1/users/products/${prodName}`); 
   }
}
