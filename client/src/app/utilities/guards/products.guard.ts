import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { TokenService } from '../../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsGuard implements CanActivate {

  constructor(
    private tokenServcie: TokenService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.tokenServcie.isTokenExpired('accessToken');
  }

}
