import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { store } from '../redux/store';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isLogin: boolean

  constructor(
    private tokenServcie: TokenService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      this.isLogin = store.getState().auth.isLogin
      console.log(this.isLogin)

    return this.isLogin ? this.tokenServcie.getAccessToken() : true
  }
}
