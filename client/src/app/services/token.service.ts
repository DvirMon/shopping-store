import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

// SERVICES
import { FormService } from './form.service';
import { AuthData, AuthService } from './auth.service';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Store } from '@ngrx/store';
import { AuthState } from '../utilities/ngrx/state/auth-state';
import * as AuthActions from '../utilities/ngrx/actions/auth-actions'
import { UserModel } from '../utilities/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private url: string = `${environment.server}/api/token`
  private tokenHelper: JwtHelperService = new JwtHelperService()


  constructor(
    private http: HttpClient,
    private store: Store<{ auth: AuthState }>
  ) { }


  // GET request - http://localhost:3000/api/auth/refresh-token
  public getRefreshToken(): Observable<AuthData> {
    return this.http.get<AuthData>(this.url + "/refresh-token").pipe(
      tap((auth: AuthData) => {
        sessionStorage.setItem("jwt", auth.token);
      }
      )
    )
  }

  // GET request - http://localhost:3000/api/auth/access-token
  public getAccessToken(): Observable<boolean> {
    return this.http.get<String>(this.url + "/access-token").pipe(
      map(data => {
        const isAuth = !!data
        this.handleAuthGuardSuccess(data)
        return isAuth
      })
      ,
      catchError(error => {
        this.handleAuthGuardError()
        return of(false)
      })
    )
  }

  // POST request - http://localhost:3000/api/token
  public getRefreshTokenWhenExpired(user: UserModel) {
    return this.http.post<AuthData>(this.url, user).pipe(
      tap(({ token }: AuthData) => {
        this.store.dispatch(new AuthActions.AddRefreshToken(token))
      }))
  }

  // Logic SECTION

  // method to gaurd success
  private handleAuthGuardSuccess(token): void {
    const { user } = this.tokenHelper.decodeToken(token)
    this.store.dispatch(new AuthActions.Login({ token, user }))
  }

  // method to guard error
  private handleAuthGuardError(): void {
    this.store.dispatch(new AuthActions.Logout())
  }


  // method to valid if token expired
  public isTokenExpired(token: string): boolean | Observable<boolean> {
    const expired = this.tokenHelper.isTokenExpired(token)

    // if access token expired get new one
    if (expired) {
      return this.getAccessToken()
    }
    return !expired
  }

}


