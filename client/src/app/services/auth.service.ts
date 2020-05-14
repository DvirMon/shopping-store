import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable, throwError } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { FormService } from './form.service';
import { ActionType } from '../redux/action-type';
import { Router } from '@angular/router';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { store } from '../redux/store';

export interface Login {
  email: string,
  password: string
}

export interface User {
  _id: string,
  isAdmin: boolean,
  email: string,
  firstName: string,
  lastName: string,
  token: string,
  city: string,
  street: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public serverError = new Subject<string>()
  public loginDate = new BehaviorSubject<any>(null)
  private tokenHelper: JwtHelperService = new JwtHelperService()

  private url: string = "http://localhost:4000/api/auth"

  constructor(
    private http: HttpClient,
    private formService: FormService,
    private router: Router
  ) { }

  // request section

  // login request - http://localhost:4000/api/auth/login
  public login(loginInfo: any) {
    return this.http.post(this.url + "/login", loginInfo)
      .pipe(
        switchMap((accessToken: string) => {
          this.formService.handleStore(ActionType.AddAccessToken, accessToken)
          return this.getRefreshToken()
            .pipe(
              map((refreshToken: string) => {
                this.formService.handleStore(ActionType.AddRefreshToken, refreshToken)
                const payload = this.tokenHelper.decodeToken(refreshToken)
                const user = payload.user
                return user._id
              }))
        }))
  }

  // register request - http://localhost:4000/api/auth/register
  public register(registerInfo: any) {
    return this.http.post(this.url + "/register", registerInfo)
      .pipe(
        switchMap((accessToken: string) => {
          this.formService.handleStore(ActionType.AddAccessToken, accessToken)
          return this.getRefreshToken()
            .pipe(
              tap((refreshToken: string) => {
                this.formService.handleStore(ActionType.AddRefreshToken, refreshToken)
                return refreshToken
              }))
        }))
  }

  // refresh token request - http://localhost:4000/api/auth/refresh-token
  public getRefreshToken() {
    return this.http.get(this.url + "/refresh-token")
  }

  // access token request - http://localhost:4000/api/auth/access-token
  public getAccessToken() {
    return this.http.get(this.url + "/access-token")
  }

  // personalId validation request  - http://localhost:4000/api/auth/register/unique-personalId
  public validUniquePersonalId(data) {
    return this.http.post(this.url + "/register/unique-personalId", data)
  }

  // end of request section

  public handleAuthGuardSuccess(response) {
    const payload = this.tokenHelper.decodeToken(response)
    this.formService.handleStore(ActionType.Login, { accessToken: response, user: payload.user })
  }

  public handleAuthGuardError(error: HttpErrorResponse) {
    this.formService.handleStore(ActionType.Logout)
  }


  public autoLogin() {
    const token = store.getState().auth.refreshToken
    const user = store.getState().auth.user
    // this.authToken()
    if (!token) {
      this.logout()
      return
    }
    this.router.navigateByUrl(`/home/${user._id}`)
  }

  public logout() {
    this.formService.handleStore(ActionType.Logout)
    this.router.navigateByUrl(`/login`)
  }


} 
