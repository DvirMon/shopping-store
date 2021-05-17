import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { tap } from 'rxjs/operators';
import { store } from '../redux/store';
import { AuthService } from 'src/app/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private tokenServcie: TokenService,
    private authService : AuthService
  ) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    // verify token?
    return this.tokenServcie.getAccessToken().pipe(
      tap(auth => {
        const user = this.authService.auth.user
        if (auth && user.isAdmin) {
          return true
        }
        return false
      }))
  }
}
