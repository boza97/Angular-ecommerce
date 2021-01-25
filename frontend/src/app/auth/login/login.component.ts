import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Alert } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  alert: Alert = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    if(loginForm.invalid) {
      return;
    }

    const email = loginForm.value.email;
    const password = loginForm.value.password;

    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['./home']);
      },
      error => {
        this.isLoading = false;
        this.alert = new Alert('danger', error);
      }
    );
  }

  closeAlert() {
    this.alert = null;
  }

}
