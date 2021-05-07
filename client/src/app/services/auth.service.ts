import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';

// SERVICES
import { GoogleService } from './google.service';
import { FormService } from './form.service';
import { TokenService } from './token.service';

// MODELS
import { UserModel } from '../utilities/models/user-model';

import { Subject, BehaviorSubject, of, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { ActionType } from '../utilities/redux/action-type';
import { store } from '../utilities/redux/store';


import { environment } from 'src/environments/environment';
import { Action } from 'rxjs/internal/scheduler/Action';

declare const gapi: any;

export interface Login {
  email: string,
  password: string
}

export interface AuthData {
  user: UserModel
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // SUBJECTS
  public serverError = new Subject<string>()
  public isRegister = new BehaviorSubject<boolean>(false)

  // SERVICE URL
  private url: string = `${environment.server}/api/auth`


  constructor(
    private router: Router,
    private http: HttpClient,
    private formService: FormService,
    private googleService: GoogleService,
    private tokenService: TokenService,
  ) { }

  // HTTP SECTION

  // POST request - http://localhost:3000/api/auth/login
  public login(payload: Login): Observable<UserModel> {
    return this.handleUser("/login", payload)
  }

  // POST request - http://localhost:3000/api/auth/login/google
  public loginGoogle(socialUser: SocialUser): Observable<UserModel | null> {
    return this.handleUser("/login/google", socialUser)
  }

  // POST request - http://localhost:3000/api/auth/register
  public register(registerInfo: UserModel): Observable<UserModel> {
    return this.handleUser("/register", registerInfo)
  }


  // POST request - handle login and register request
  private authToServer(path: string, data: any, reCaptcha: string): Observable<AuthData> {
    return this.http.post<AuthData>(this.url + path, { data, reCaptcha })
  }
  // END OF HTTP SECTION


  // LOGIC SECTION

  // generic method to user login/register
  private handleUser(path: string, data: any): Observable<UserModel | null> {

    return this.handleRecaptcha(path, data)
      .pipe(
        switchMap((response: AuthData) => {
          this.formService.handleStore(ActionType.AddAccessToken, response.token)
          return this.setUser()
        })
      )
  }

  // method to handle reCaptcha and sent login/regiter request
  private handleRecaptcha(path: string, payload: any) {
    return this.googleService.getReCaptcha('login')
      .pipe(
        switchMap((reCaptcha: string) => {
          return this.authToServer(path, payload, reCaptcha)
        }))
  }

  // method to set refreshToken and user model
  private setUser(): Observable<UserModel> {
    return this.tokenService.getRefreshToken()
      .pipe(
        map((response: AuthData) => {
          this.formService.handleStore(ActionType.AddRefreshToken, response.token)
          this.formService.handleStore(ActionType.Login, response)
          return response.user
        }))
  }


  // method to auto login
  public async autoLogin() {
    const token: string = store.getState().auth.refreshToken
    const user: UserModel = store.getState().auth.user
    if (!token) {
      await this.googleService.signOutWithGoogle()
      this.logout()
      return
    }
    if (store.getState().auth.socialUser) {
      await this.googleService.signInWithGoogle()
    }
    this.handleRoleRoute(user)
  }

  // method to navigate according to user role
  public handleRoleRoute(user: UserModel): Promise<boolean> {


    if (!user) {
      return this.router.navigateByUrl("products/categories")
    }

    return user.isAdmin ?
      this.router.navigateByUrl("admin" + environment.productLandingPage)
      : this.router.navigateByUrl("products/categories")
  }

  // method to logout
  public logout(): Promise<boolean> {
    this.formService.handleStore(ActionType.Logout)
    return this.router.navigateByUrl(`/`)
  }

  // end of login/register logic

}
