import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, from, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  showMessage: boolean = false;
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

  private storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('ACCESS_TOKEN_KEY', accessToken);
    localStorage.setItem('REFRESH_TOKEN_KEY', refreshToken);
  }

  iniciarSesion(form: any) {
    return this.http.post<any>('http://127.0.0.1:8000/login/', form).pipe(
      map(response => {
        this.storeTokens(response.token, response.refresh_token);
        this.loadData();
        return response;
      }),
      tap(() => this.isAuthenticated.next(true)),
      catchError(error => {
        console.error('Login failed', error);
        throw error;
      })
    );
  }

  public getRefreshToken() {
		return localStorage.getItem('REFRESH_TOKEN_KEY');
	}

	public getAccessToken() {
		return localStorage.getItem('ACCESS_TOKEN_KEY');
	}

  public async isLoggedIn() : Promise<boolean> {
		const token = await this.getRefreshToken();
		return !!token;
	}

  getShowMessage(): boolean{
    return this.showMessage;
  }

  checkRefreshToken(refreshToken: string){
    this.showMessage = true;
    return this.http.post<any>(`http://127.0.0.1:8000/api/token/refresh/`, {
      'refresh': refreshToken,
    })

  }

}




// if (!isLoggedIn) {
//   this.router.navigate(['/auth/login']);
//   return false;
// } else {
//   const token = this.auth.getRefreshToken() || '';
//   this.auth.checkRefreshToken(token).subscribe(
//     (resp) => {
//       console.log(resp);
//     },
//     (err) => {
//       if(err.status === 401 || err.status === 400 || err.status === 402){
//         console.log(err);
//         this.router.navigate(['/auth/login']);
//         return true;
//       }else {
//         return false;
//       }
//     }
//   );
//   return true;
// }
