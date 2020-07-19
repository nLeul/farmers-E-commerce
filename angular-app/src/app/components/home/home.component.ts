import { Component, OnInit } from '@angular/core';
import { FarmerApiService } from 'src/app/services/farmer-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user=null;
  constructor(private farmServ: FarmerApiService) {
    this.user = this.farmServ.getLoggedInUser();
    console.log("this.user");
  }

  ngOnInit(): void {
  
  }


}
