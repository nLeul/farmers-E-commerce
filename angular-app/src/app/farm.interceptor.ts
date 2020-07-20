import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FarmerApiService } from './services/farmer-api.service';

@Injectable()
export class FarmInterceptor implements HttpInterceptor {

  constructor(private farmServ: FarmerApiService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${this.farmServ.getToken()}`
        }
      })
    return next.handle(request);

  }


}
