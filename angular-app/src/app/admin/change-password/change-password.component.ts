import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FarmerApiService } from 'src/app/services/farmer-api.service';

@Component({
  selector: 'app-change-password',
  template: `
 <div class="login">
  <h1>Enter new Password</h1>
  <form [formGroup]="passwordData" (ngSubmit)="onSubmit()" class="form">
    <mat-form-field class="full-width" >
      <mat-label>Password</mat-label>
      <input type="password" matInput placeholder="Password" formControlName="password">
    </mat-form-field>
    <button mat-raised-button color="primary">Change</button>
  </form>
</div>
  `,
  styleUrls:['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordData: FormGroup;
  id;
  constructor(private formBuilder: FormBuilder, private router: Router, private farmServ: FarmerApiService,private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.id = params['accountId'];
    })

  }
  onSubmit() {
    console.log(this.id)
    console.log(this.passwordData.value);
    this.farmServ.changePassword(this.id, this.passwordData.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['admin', 'accounts']);
    }
    )
  }

  ngOnInit(): void {
    this.passwordData = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

}
