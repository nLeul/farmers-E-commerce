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
    return this.http.get<IProducts>(`http://localhost:3000/api/v1/users/products?farmerId=${farmerId}`);
  }
  deleteProduct(prodId) {
    return this.http.delete<IProducts>(`http://localhost:3000/api/v1/users/products?prodId=${prodId}`);
  }
  editProduct(prodId, formData) {
    return this.http.patch<IProducts>(`http://localhost:3000/api/v1/users/products?prodId=${prodId}`, formData);
  }
  getProductById(prodId) {
    return this.http.get<IProducts>(`http://localhost:3000/api/v1/users/products/${prodId}`);
  }
  addProduct(data) {
    return this.http.post<IProducts>('http://localhost:3000/api/v1/users/products ',data)
  }

  login(user_log) {

    return this.http.post(`http://localhost:3000/api/v1/users/signin`, user_log).pipe(
      tap((u) => {
        this.user = u;
        console.log(this.user);
        //localStorage.setItem("token", u.token);
      })
    );
  }

  getLoggedInUser(): Observable<any> {
    return of(this.user);
  }
  logout() {
    this.user = null;
  }

}
