import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  invalidCredentials = false;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      adminId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    if (this.loginForm?.valid) {
     
      const adminId = this.loginForm?.get('adminId')?.value;
      const password = this.loginForm?.get('password')?.value;
  
      if (adminId === '1111' && password === 'admin123') {
        console.log("yess ok")
        this.invalidCredentials = false;
        // Navigate to the display component
        this.router.navigate(['/display']);
      } else {
        this.invalidCredentials = true;
      }
    }
  }
  
}

