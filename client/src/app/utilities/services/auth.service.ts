import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Subject, BehaviorSubject, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { FormService } from './form.service';
import { UserModel } from '../models/user-model';

import { store } from '../../redux/store';
import { ActionType } from '../../redux/action-type';

import { JwtHelperService } from "@auth0/angular-jwt";
import { config } from "../../../main-config"
import { CartService } from './cart.service';

export interface Login {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public spinnerOpen: Subject<boolean> = new Subject<boolean>();
  public onOpen(event) {
    this.spinnerOpen.next(true);
  }

  public spinnerClose: Subject<boolean> = new Subject<boolean>();
  public onClose(event) {
    this.spinnerOpen.next(false);
  }

  public serverError = new Subject<string>()
  public loginDate = new BehaviorSubject<any>(null)

  private tokenHelper: JwtHelperService = new JwtHelperService()
  private url: string = `http://localhost:${config.portAuth}/api/auth`
  private expiredTimer: any


  constructor(
    private http: HttpClient,
    private router: Router,
    private formService: FormService,
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

  // login actions section
  public handleUser(path: string, data) {
    return this.http.post(this.url + path, data)
      .pipe(
        switchMap((response: any) => {
          this.formService.handleStore(ActionType.AddAccessToken, response.accessToken)
          return this.getRefreshToken()
            .pipe(
              map((response: any) => {
                this.formService.handleStore(ActionType.AddRefreshToken, response.refreshToken)
                return response.user._id
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
    const isCartActive = store.getState().cart.isCartActive
    if (!token) {
      this.logout()
      return
    }
    this.router.navigateByUrl(`/home/${user._id}`)
    this.getAccessToken().subscribe()
  }

  public logout() {
    this.formService.handleStore(ActionType.Logout)
    // clearTimeout(this.expiredTimer)
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
