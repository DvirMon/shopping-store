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

  private url: string = `http://localhost:${config.portAuth}/api/auth`


  constructor(
    private http: HttpClient,
    private formService: FormService,
    private router: Router
  ) { }

  // request section

  // login request - http://localhost:4000/api/auth/login
  public login(loginInfo: any) {
    return this.handleUser("/login", loginInfo)
  }

  // register request - http://localhost:4000/api/auth/register
  public register(registerInfo: User) {
    return this.handleUser("/register", registerInfo)
  }

  // refresh token request - http://localhost:4000/api/auth/refresh-token
  public getRefreshToken() {
    return this.http.get(this.url + "/refresh-token")
  }

  // access token request - http://localhost:4000/api/auth/access-token
  // public getAccessToken() {
  //   return this.http.get(this.url + "/access-token")
  // }

  public getAccessToken() {
    return this.http.get(this.url + "/access-token").pipe(
      map(data => {
        const isAuth = !!data
        this.handleAuthGuardSuccess(data)
        return isAuth
      })
      ,
      catchError(error => {
        this.handleAuthGuardError(error)
        return of(false)
      })
    )
  }

  // end of request section

  // logic section

  public handleUser(path: string, data) {
    return this.http.post(this.url + path, data)
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

  public handleAuthGuardSuccess(response) {
    const payload = this.tokenHelper.decodeToken(response)
    console.log(response)
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
    // change!!!!!!!!!!!!!!!! 
    this.router.navigateByUrl(`/products/5e91e29b9c08fc560ce2cf35`)
    this.getAccessToken().subscribe()
  }

  public logout() {
    this.formService.handleStore(ActionType.Logout)
    this.router.navigateByUrl(`/login`)
  }


} 
