import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { FormService } from './form.service';
import { ActionType } from '../redux/action-type';
import { Router } from '@angular/router';
import { switchMap, map, tap, catchError } from 'rxjs/operators';
import { store } from '../redux/store';
import { config } from "../../main-config"
import { UserModel } from '../models/user-model';

export interface Login {
  email: string,
  password: string
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public serverError = new Subject<string>()
  public loginDate = new BehaviorSubject<any>(null)

  private tokenHelper: JwtHelperService = new JwtHelperService()
  private url: string = `http://localhost:${config.portAuth}/api/auth`
  private expiredTimer: any


  constructor(
    private http: HttpClient,
    private formService: FormService,
    private router: Router,
  ) { }

  // request section

  // login request - http://localhost:4000/api/auth/login
  public login(loginInfo: any) {
    return this.handleUser("/login", loginInfo)
  }

  // register request - http://localhost:4000/api/auth/register
  public register(registerInfo: UserModel) {
    return this.handleUser("/register", registerInfo)
  }

  // refresh token request - http://localhost:4000/api/auth/refresh-token
  public getRefreshToken() {
    return this.http.get(this.url + "/refresh-token")
  }

  // access token request - http://localhost:4000/api/auth/access-token
  public getAccessToken() {
    return this.http.get(this.url + "/access-token").pipe(
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

  // end of request section

  // logic section
  public handleUser(path: string, data) {
    return this.http.post(this.url + path, data)
      .pipe(
        switchMap((response: any) => {
          this.formService.handleStore(ActionType.AddAccessToken, response.accessToken)
          return this.getRefreshToken()
            .pipe(
              map((response: any) => {
                this.formService.handleStore(ActionType.AddRefreshToken, response.refreshToken)
                return response.user
              }))
        }))
  }

  public handleAuthGuardSuccess(accessToken) {
    const payload = this.tokenHelper.decodeToken(accessToken)
    this.formService.handleStore(ActionType.Login, { accessToken, user: payload.user })
    // this.autoLogout(accessToken)
  }

  public handleAuthGuardError() {
    this.formService.handleStore(ActionType.Logout)
  }

  public autoLogin() {
    const token = store.getState().auth.refreshToken
    const user = store.getState().auth.user
    if (!token) {
      this.logout()
      return
    }
    this.router.navigateByUrl(`/products/5e91e29b9c08fc560ce2cf32`)
    // this.router.navigateByUrl(`/home/${user._id}`)
    this.getAccessToken().subscribe()
  }

  public logout() {
    this.formService.handleStore(ActionType.Logout)
    this.router.navigateByUrl(`/login`)
  }

  public autoLogout(jwt: string) {
    const expirationTokenDate = this.getTokenExpirationDate(jwt)
    this.expiredTimer = setTimeout(() => {
      this.logout()
    }, expirationTokenDate)
  }

  // token logic

  public isTokenExpired(jwt: string): boolean {
    const token = store.getState().auth[jwt]
    const expired = this.tokenHelper.isTokenExpired(token)
    return !expired
  }

  public getTokenExpirationDate(jwt: string): number {
    const token = store.getState().auth[jwt]
    const expirationDate = this.tokenHelper.getTokenExpirationDate(token);
    const expirationTokenDate = new Date(expirationDate).getTime() - new Date().getTime()
    return expirationTokenDate
  }



} 
