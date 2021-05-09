import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { store } from '../redux/store';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private refreshToken: string


  constructor(
    private tokenServcie: TokenService,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.refreshToken = store.getState().auth.refreshToken
    return this.refreshToken ? this.tokenServcie.getAccessToken() : true
  }
}
