import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// SERVICES
import { FormService } from './form.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthData } from './auth.service';
import { store } from '../utilities/redux/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ActionType } from '../utilities/redux/action-type';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private url: string = `${environment.server}/api/token`
  private tokenHelper: JwtHelperService = new JwtHelperService()


  constructor(
    private http: HttpClient,
    private formService: FormService,
  ) { }


  // GET request - http://localhost:3000/api/auth/refresh-token
  public getRefreshToken(): Observable<AuthData> {
    return this.http.get<AuthData>(this.url + "/refresh-token")
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
  public getRefreshTokenWhenExpired() {
    const user = store.getState().auth.user
    return this.http.post<AuthData>(this.url, user).pipe(
      tap((response: AuthData) => {
        this.formService.handleStore(ActionType.AddRefreshToken, response.token)
      }))
  }

  // Logic SECTION

  // method to gaurd success
  private handleAuthGuardSuccess(accessToken): void {
    const payload = this.tokenHelper.decodeToken(accessToken)
    this.formService.handleStore(ActionType.Login, { accessToken, user: payload.user })
  }

  // method to guard error
  private handleAuthGuardError(): void {
    this.formService.handleStore(ActionType.Logout)
  }


  // method to valid if token expired
  public isTokenExpired(jwt: string): boolean | Observable<boolean> {
    const token = store.getState().auth[jwt]
    const expired = this.tokenHelper.isTokenExpired(token)

    // if access token expired get new one
    if (expired) {
      return this.getAccessToken()
    }
    return !expired
  }

  // method to get token expired date
  public getTokenExpirationDate(jwt: string): number {
    const token = store.getState().auth[jwt]
    const expirationDate = this.tokenHelper.getTokenExpirationDate(token);
    const expirationTokenDate = new Date(expirationDate).getTime() - new Date().getTime()
    return expirationTokenDate
  }

}


