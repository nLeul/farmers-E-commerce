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

  getProducts() {
    return this.http.get<IProducts>('http://localhost:3000/api/v1/users/products');
  }
  deleteProduct(prodId) {
    return this.http.delete<IProducts>(`http://localhost:3000/api/v1/users/products/${prodId}`);
  }
  editProduct(prodId, formData) {
    return this.http.patch<IProducts>(`http://localhost:3000/api/v1/users/products/${prodId}`, formData);
  }
  getProductByName(prodName) {
    return this.http.get<IProducts>(`http://localhost:3000/api/v1/users/products/${prodName}`);
  }
  addProduct(data) {
    return this.http.post<IProducts>('http://localhost:3000/api/v1/users/products ',data)
  }

  login(user) {

    return this.http.post(`http://localhost:3000/api/v1/users/signin`, user).pipe(
      tap((u) => {
        this.user = u;
        console.log(this.user);
        //localStorage.setItem("token", u.token);
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getLoggedInUser(): Observable<any> {
    return of(this.user);
  }
  logout() {
    this.user = null;
  }

}
