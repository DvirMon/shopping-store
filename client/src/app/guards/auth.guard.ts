import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { store } from '../redux/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { switchMap, tap, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
  ) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
      // verify token? 
    return this.authService.getAccessToken().pipe(
      map(data => {
        const isAuth = !!data
        this.authService.handleAuthGuardSuccess(data)
        return isAuth
      })  
      ,  
      catchError(error => {
        this.authService.handleAuthGuardError(error)
        return of(false)
      })
    )

  }
}