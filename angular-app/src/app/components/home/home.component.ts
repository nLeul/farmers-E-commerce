import { Component, OnInit } from '@angular/core';
import { FarmerApiService } from 'src/app/services/farmer-api.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user = null;
  constructor(private farmServ: FarmerApiService,private router:Router) {
    console.log('insded constructor')
    this.farmServ.getLoggedInUser().subscribe(u => {
      this.user = u;
      console.log('user:',u, this.user)
    });
  }

  ngOnInit(): void {
  }

  getLoggedInUser(): Observable<any> {
    return this.farmServ.getLoggedInUser();
  }
  logout(): void {
    this.farmServ.logout();
    this.router.navigate(['/'])
  }


}
