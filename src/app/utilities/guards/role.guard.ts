import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/feat-modules/auth/auth.service';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private authService : AuthService
  ) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    // verify token?
    return this.tokenService.getAccessToken().pipe(
      tap(auth => {
        const user = this.authService.auth.user
        if (auth && user.isAdmin) {
          return true
        }
        return false
      }))
  }
}
