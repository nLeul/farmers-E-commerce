import { Component, OnInit } from '@angular/core';
import { FarmerApiService } from 'src/app/services/farmer-api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template:`<img src="https://attra.ncat.org/wp-content/uploads/2018/07/ATTRA-SIFT-FARM-slide.jpg" alt="Italian Trulli">
  `,
  styles:['img {width:100%;height:auto}']
 
})
export class HomeComponent {

}
