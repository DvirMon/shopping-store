import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject, BehaviorSubject, of, Observable } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { FormService } from './form.service';
import { UserModel } from '../models/user-model';


import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

import { JwtHelperService } from "@auth0/angular-jwt";
import { config } from "src/main-config"
import { environment } from 'src/environments/environment';

export interface Login {
  email: string,
  password: string
}

export interface AuthData {
  token: string
  user: UserModel
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public serverError = new Subject<string>()
  public loginDate = new BehaviorSubject<any>(null)
  public isRegister = new BehaviorSubject<boolean>(false)

  private tokenHelper: JwtHelperService = new JwtHelperService()
  private url: string = `${environment.server}/api/auth`


  constructor(
    private http: HttpClient,
    private formService: FormService,
    private router: Router,
  ) { }

  // request section 

  // login request - http://localhost:3000/api/auth/login
  public login(loginInfo: any) {
    return this.handleUser("/login", loginInfo)
  }

  // register request - http://localhost:3000/api/auth/register
  public register(registerInfo: UserModel) {
    return this.handleUser("/register", registerInfo)
  }

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

  // POST request - http://localhost:3000/api/auth/refresh-token
  public getRefreshTokenWhenExpired() {
    const user = store.getState().auth.user
    return this.http.post<AuthData>(this.url + "/refresh-token", user).pipe(
      tap((response: AuthData) => {
        this.formService.handleStore(ActionType.AddRefreshToken, response.token)
      }))
  }

  // POST request - captcha validation - http://localhost:3000/api/auth/captcha
  public authReCaptcha(captcha: string): Observable<boolean> {
    return this.http.post<boolean>(this.url + "/captcha", { captcha })
  }


  // end of request section 

  // login actions section

  // generic function to user login/register
  public handleUser(path: string, data): Observable<UserModel> {
    return this.http.post<AuthData>(this.url + path, data)
      .pipe(
        switchMap((response: AuthData) => {
          this.formService.handleStore(ActionType.AddAccessToken, response.token)
          return this.getRefreshToken()
            .pipe(
              map((response: AuthData) => {
                this.formService.handleStore(ActionType.AddRefreshToken, response.token)
                return response.user
              }))
        }))
  }

  private handleAuthGuardSuccess(accessToken): void {
    const payload = this.tokenHelper.decodeToken(accessToken)
    this.formService.handleStore(ActionType.Login, { accessToken, user: payload.user })
  }

  private handleAuthGuardError(): void {
    this.formService.handleStore(ActionType.Logout)
  }

  public autoLogin(): void {
    const token = store.getState().auth.refreshToken
    const user = store.getState().auth.user
    if (!token) {
      this.logout()
      return
    }
    this.handleRoleRoute(user)
  }

  public handleRoleRoute(user: UserModel): Promise<boolean> {
    return user.isAdmin ?
      this.router.navigateByUrl("admin" + config.baseProductUrl)
      : this.router.navigateByUrl(`home/${user._id}`)
  }

  public logout(): Promise<boolean> {
    this.formService.handleStore(ActionType.Logout)
    return this.router.navigateByUrl(`/login`)
  }


  // token logic

  public isTokenExpired(jwt: string): boolean | Observable<boolean> {
    const token = store.getState().auth[jwt]
    const expired = this.tokenHelper.isTokenExpired(token)

    // if access token expired get new one
    if (expired) {
      return this.getAccessToken()
    }
    return !expired
  }

  public getTokenExpirationDate(jwt: string): number {
    const token = store.getState().auth[jwt]
    const expirationDate = this.tokenHelper.getTokenExpirationDate(token);
    const expirationTokenDate = new Date(expirationDate).getTime() - new Date().getTime()
    return expirationTokenDate
  }



} 
