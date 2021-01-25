import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

interface LoginResponseData {
  status: string,
  token: string,
  expiresIn: number,
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string) {
    return this.http.post<{ status: string, message: string }>(`${this.apiUrl}/register`, {
      firstname,
      lastname,
      email,
      password,
      confirmPassword
    }).pipe(catchError(errorResponse => {
      let message = 'Uneti podaci nisu ispravni.';

      if (!errorResponse.error.message || !errorResponse.error.status) {
        return throwError(message);
      }

      if (errorResponse.error.status == "EMAIL_EXISTS") {
        message = 'Korisnik sa unetom email adresom već postoji.'
      }
      return throwError(message);
    }));
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponseData>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(
      catchError(errorResponse => {
        return throwError('Podaci koje ste uneli nisu ispravni.');
      }),
      tap(resData => {
        const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
        const user = new User(
          resData.user.id,
          resData.user.firstname,
          resData.user.lastname,
          resData.user.email,
          resData.token,
          expirationDate);

        this.user.next(user);
        this.autoLogout(resData.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
      }));
  }

  autoLogin() {
    const userData: {
      id: number,
      firstname: string,
      lastname: string,
      email: string,
      _token: string,
      _tokenEXpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.id, userData.firstname, userData.lastname, userData.email, userData._token, new Date(userData._tokenEXpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenEXpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['login']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.user.pipe(
        take(1),
        tap(user => {
          if(user) {
            localStorage.removeItem(`cart${user.id}`);
            this.logout();
          }
        })
      ).subscribe();
    }, expirationDuration);

  }
}
