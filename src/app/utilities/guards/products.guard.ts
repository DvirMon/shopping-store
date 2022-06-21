import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/feat-modules/auth/auth.service';

import { TokenService } from '../../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.tokenService.isTokenExpired(this.authService.auth.accessToken)
  }

}
