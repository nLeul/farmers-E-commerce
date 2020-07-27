import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http'
import {tap} from 'rxjs/operators'
import { of, Observable } from 'rxjs';

interface IProducts {
  success: boolean,
  data: []
}



@Injectable({
  providedIn: 'root'
})
export class FarmerApiService {
  user: any;
  constructor(private http: HttpClient) { }

  getProducts(farmerId) {
    return this.http.get<IProducts>(`https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/products?farmerId=${farmerId}`);
  }
  deleteProduct(prodId) {
    return this.http.delete<IProducts>(`https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/products?prodId=${prodId}`);
  }
  editProduct(prodId, formData) {
    return this.http.patch<IProducts>(`https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/products?prodId=${prodId}`, formData);
  }
  getProductById(prodId) {
    return this.http.get<IProducts>(`https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/products/${prodId}`);
  }
  addProduct(data) {
    return this.http.post<IProducts>('https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/products ',data)
  }

  login(user_log) {

    return this.http.post(`https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/signin`, user_log).pipe(
      tap((u:any) => {
        this.user = u;
        console.log(this.user);
       localStorage.setItem("user", JSON.stringify(this.user));
      })
    );
  }

  setUser() {
       this.user= JSON.parse(localStorage.getItem("user"));
  }

  getLoggedInUser(): Observable<any> {
    return of(this.user);
  }
  logout() {
    this.user = null;
    localStorage.removeItem("user");

  }
  register(data) {
    return this.http.post<IProducts>(`https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/signup`,data);
  }

  getOrdersByStatus(pending,ready,complete,farmerId) {
    return this.http.get<IProducts>(`https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/orders?pending=${pending}&ready=${ready}&complete=${complete}&farmerId=${farmerId} ` )
  }
  readyOrder(orderId,data) {
    return this.http.patch<IProducts>(`https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/farmers/${orderId}`,data)
  }
  completeOrder(orderId,data) {
    return this.http.patch<IProducts>(`https://farmers-shop-284315.uc.r.appspot.comapi/v1/users/farmers/${orderId}`,data)
  }
  getAllUsers() {
    return this.http.get<IProducts>('https://farmers-shop-284315.uc.r.appspot.com/api/v1/users/admin');
  }

}
