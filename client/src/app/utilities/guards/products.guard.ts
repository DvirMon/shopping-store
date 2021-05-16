import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserModel } from '../models/user-model';
import { TokenService } from '../../services/token.service';

import { store } from '../redux/store';

@Injectable({
  providedIn: 'root'
})
export class ProductsGuard implements CanActivate {

  private isLogin: boolean = store.getState().auth.isLogin

  constructor(
    private tokenServcie: TokenService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.isLogin
      ? this.tokenServcie.isTokenExpired('accessToken')
      : true

  }

}
