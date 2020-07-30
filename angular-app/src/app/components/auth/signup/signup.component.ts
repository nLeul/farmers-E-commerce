import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmerApiService } from 'src/app/services/farmer-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(private fb:FormBuilder,private router: Router, private farmServ: FarmerApiService) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required,Validators.email],
      password: ['', Validators.required],
      phone_number: ['', Validators.required,Validators.min(10)],
    });
  }
checkError = (controlName: string, errorName: string) => {
    return this.signUpForm.controls[controlName].hasError(errorName);
  }
  onSubmit() {
    let formData = this.signUpForm.value;
    let role = { role: "farmer" };
    let finalObj={...formData,...role}

    this.farmServ.register(finalObj).subscribe(res => {
    this.router.navigate(['signin']);
    })
  }
}
