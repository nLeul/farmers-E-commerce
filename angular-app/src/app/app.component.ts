import { Component } from '@angular/core';
import { FarmerApiService } from './services/farmer-api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user = null;
  constructor(private farmServ: FarmerApiService, private router: Router) {
    //check logged in user
    this.farmServ.getLoggedInUser().subscribe(U => {
      // check local storage
      if (!U) {
        this.farmServ.setUser();

      }
    })

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
