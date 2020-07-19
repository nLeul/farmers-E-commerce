import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmerApiService } from 'src/app/services/farmer-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: string;
  loginForm: FormGroup;
  submitted = false;
  user=null;
  constructor(private formBuilder: FormBuilder, private router: Router, private farmServ: FarmerApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get data() { return this.loginForm.controls; }


  onSubmit() {
    this.farmServ.login(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem("token", res.token); 
      this.router.navigate(["farmers"]);
    });
  }



}
