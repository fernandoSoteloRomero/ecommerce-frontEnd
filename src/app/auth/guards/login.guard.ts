import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, from, map } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return from(this.auth.isLoggedIn()).pipe(
        map(isLoggedIn => {
          console.log(isLoggedIn, 'LoginGuard');
          if(isLoggedIn){
            this.router.navigateByUrl('/cibernetica')
            return false;
          }else{
            return true;
          }
        })
      )
  }

}

// import { Observable, tap } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import { inject } from '@angular/core';
// import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';

// const checkAuthStatus = (): boolean | Observable<Boolean> => {
//   const authService: AuthService = inject(AuthService);
//   const router: Router = inject(Router);
//   return authService.checkAuthentication().pipe(
//     tap((isAuth) => console.log(isAuth)),
//     tap((isAuth) => {
//       if (!isAuth) {
//         router.navigateByUrl('/auth/login');
//       }
//     })
//   );
// };
// export const canMatchGuard: CanMatchFn = (
//   route: Route,
//   segments: UrlSegment[]
// ) => {
//   return checkAuthStatus();
// };
