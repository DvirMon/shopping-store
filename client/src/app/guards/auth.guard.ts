import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { store } from '../redux/store';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private tokenHelper: JwtHelperService = new JwtHelperService()

  constructor(
    private authService: AuthService,
  ) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = store.getState().auth.token
    console.log(!this.tokenHelper.isTokenExpired(null))
    
    // verify token?


    return !this.tokenHelper.isTokenExpired(token)
  }
}
