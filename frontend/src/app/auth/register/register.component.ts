import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/services/auth.service';
import { equalValidator } from '../../shared/directives/equal.directive';

export class Alert {
  constructor(public type: string, public message: string) {}
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  alert: Alert = null;
  isLoading = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const firstname = this.registerForm.value.firstname;
    const lastname = this.registerForm.value.lastname;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    this.isLoading = true;
    this.authService.register(firstname, lastname, email, password, confirmPassword)
      .subscribe(
        () => {
          this.isLoading = false;
          this.alert = new Alert('success', 'Uspešno ste se registrovali, prijavite se kako bi nastavili dalje.');
          this.registerForm.reset();
        },
        error => {
          this.isLoading = false;
          this.alert = new Alert('danger', error);
        });
    
  }

  private initForm() {
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      lastname: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\.]).{6,}$/)]
      }),
      confirmPassword: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, equalValidator('password')]
      })
    });
  }

  closeAlert() {
    this.alert = null;
  }

}
