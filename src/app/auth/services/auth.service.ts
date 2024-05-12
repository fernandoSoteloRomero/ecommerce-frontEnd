import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/User.interface';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  private user?: User;

  login(user: any): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<User>(
        `http://127.0.0.1:8000/login/`,
        JSON.stringify(user),
        httpOptions
      )
      .pipe(
        tap((user) => (this.user = user)),
        tap((user) => localStorage.setItem('token', user.token.toString()))
      );
  }
}
