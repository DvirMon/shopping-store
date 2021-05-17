import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserModel } from '../models/user-model';
import { TokenService } from '../../services/token.service';

import { store } from '../redux/store';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsGuard implements CanActivate {

  private isLogin: boolean

  constructor(
    private tokenServcie: TokenService,
    private authService : AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.auth.isLogin
      ? this.tokenServcie.isTokenExpired(this.authService.auth.accessToken)
      : true

  }

}
