import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { Observable, from, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return from(this.auth.isLoggedIn()).pipe(
        map(isLoggedIn => {
          if (!isLoggedIn) {
            console.log(isLoggedIn, 'AuthGuard');
            this.router.navigate(['/cibernetica/inicio']);
            return false;
          } else {
            return true; 
          }
        })
      )
  }
  
}