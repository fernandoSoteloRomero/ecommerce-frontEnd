import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, from, map, switchMap, of, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return from(this.auth.isLoggedIn()).pipe(
      switchMap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigateByUrl('/auth/login');
          return of(false);
        }

        if (isLoggedIn) {
          const token = this.auth.getRefreshToken() || '';
          return this.auth.checkRefreshToken(token).pipe(
            map((resp) => {
              localStorage.setItem('ACCESS_TOKEN_KEY', resp.access)
              return true;
            }),
            catchError((err) => {
              console.log(err,'err');
              this.router.navigateByUrl('/auth/login')
              return of(false);
            })
          )
        }
        return of(true);
      })
    );
  }
}
