import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  loggedUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private accessToken: any;
  private refreshToken: any;
  constructor(private http: HttpClient, private router: Router) {
    this.loadData();
  }

  async loadData() {
    const access_token = localStorage.getItem('ACCESS_TOKEN_KEY');
    const refresh_token = localStorage.getItem('REFRESH_TOKEN_KEY');
    if (access_token) {
      this.accessToken = access_token;
      this.refreshToken = refresh_token;

      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  public iniciarSesion(form: any) {
    return this.http.post<any>(` http://127.0.0.1:8000/login/ `, form).pipe(
      map((response) => {
        const storeAccess = localStorage.setItem(
          'ACCESS_TOKEN_KEY',
          response.token
        );
        const storeRefresh = localStorage.setItem(
          'REFRESH_TOKEN_KEY',
          response.refresh_token
        );

        this.loadData();

        return from(Promise.all([storeAccess, storeRefresh]));
      }),
      tap((_) => {
        this.isAuthenticated.next(true);
      })
    );
  }

  public getRefreshToken() {
		// return Preferences.get({key: "REFRESH_TOKEN_KEY"});
		return localStorage.getItem('REFRESH_TOKEN_KEY');
	}

	public getAccessToken() {
		return localStorage.getItem('ACCESS_TOKEN_KEY');
	}

  public async isLoggedIn() : Promise<boolean> {
		const token = await this.getRefreshToken();
		return !!token;
	}
}
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { User, UserClass } from '../interfaces/User.interface';
// import { Observable, catchError, map, of, tap } from 'rxjs';

// constructor(private http: HttpClient) {}
// private user?: User;

// login(user: any): Observable<User> {
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//     }),
//   };
//   return this.http
//     .post<User>(
//       `http://127.0.0.1:8000/login/`,
//       JSON.stringify(user),
//       httpOptions
//     )
//     .pipe(
//       tap((user) => (this.user = user)),
//       tap((user) => {
//         localStorage.setItem('token', user.token.toString());
//         localStorage.setItem('user', JSON.stringify(user.user));


// get currentUser(): User | undefined {
//   if (!this.user) return undefined;

//     // Crea una copia profunda
//     return structuredClone(this.user);
//   }
// }