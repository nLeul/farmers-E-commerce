import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FarmerApiService } from './services/farmer-api.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class FarmInterceptor implements HttpInterceptor {

  constructor(private farmServ: FarmerApiService,private router:Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let temp = null;
    this.farmServ.getLoggedInUser().subscribe(check => { 
      //console.log(check);
      temp = check;
    })
    if (temp) { 
      request = request.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${temp['token']}`
          }
        })
    }
 
    return next.handle(request).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      if (err.status !== 401) {
       return;
      }
      this.router.navigate(['signin']);
    }
  }));
}
};




