import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';

// SERVICES
import { GoogleService } from './google.service';
import { TokenService } from './token.service';

// MODELS
import { UserModel } from '../utilities/models/user-model';

import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CartModel } from '../utilities/models/cart-model';

// NGRX
import { Store } from '@ngrx/store';

import { AuthState } from '../utilities/ngrx/state/auth-state';

import * as  AuthActions from "../utilities/ngrx/actions/auth-actions";
import * as  CartActions from "../utilities/ngrx/actions/cart-action";

import { userSelecotr } from '../utilities/ngrx/auth-selectors';

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

  // NGRX STORE
  private auth$: Observable<AuthState> = this.store.select('auth')
  private user$: Observable<UserModel> = this.store.select(userSelecotr)
  public auth: AuthState

  // SUBJECTS
  public serverError = new Subject<string>()

  // SERVICE URL
  private url: string = `${environment.server}/api/auth`


  constructor(
    private router: Router,
    private http: HttpClient,

    private googleService: GoogleService,
    private tokenService: TokenService,

    private store: Store<{ auth: AuthState }>
  ) {

    this.subscribeToAuthState()

  }

  // STORE SECTION

  private subscribeToAuthState() {
    this.auth$.subscribe(
      (auth: AuthState) => {
        this.auth = auth
      }
    )
  }

  // HTTP SECTION

  // POST request - http://localhost:3000/api/auth/login
  public login(payload: Login): Observable<UserModel> {
    return this.handleUser("/login", payload)
  }

  // POST request - http://localhost:3000/api/auth/login/google
  public loginGoogle(): Observable<UserModel> {
    return this.googleService.loginGoogle().pipe(
      switchMap((socialUser: SocialUser) => {
        return this.handleUser("/login/google", socialUser)
      })
    )


  }

  // POST request - http://localhost:3000/api/auth/register
  public register(registerInfo: UserModel): Observable<UserModel> {
    return this.handleUser("/register", registerInfo)
  }


  // POST REQUEST - meim http method to login and register
  private getUser(path: string, data: any, reCaptcha: string): Observable<AuthData> {
    return this.http.post<AuthData>(this.url + path, { data, reCaptcha })
  }
  // END OF HTTP SECTION


  // LOGIC SECTION

  // generic method to user login/register
  private handleUser(path: string, data: any): Observable<UserModel | null> {

    // get recaptcha
    return this.handleRecaptcha(path, data)
      .pipe(
        switchMap(({ token }: AuthData) => {
          this.store.dispatch(new AuthActions.AddAccessToken(token))

          // handle server response
          return this.setUser()
        })
      )
  }

  // method to handle reCaptcha and sent login/regiter request
  private handleRecaptcha(path: string, payload: any) {
    return this.googleService.getReCaptcha('login')
      .pipe(
        switchMap((reCaptcha: string) => {

          // send auth data to server
          return this.getUser(path, payload, reCaptcha)
        }))
  }

  // method to set refreshToken and set user
  private setUser(): Observable<UserModel> {
    return this.tokenService.getRefreshToken()
      .pipe(
        map((response: AuthData) => {
          this.store.dispatch(new AuthActions.AddRefreshToken(response.token))
          this.store.dispatch(new AuthActions.Login(response))
          return response.user
        }))
  }


  // method to auto login
  public async autoLogin(): Promise<boolean> {

    const cart: CartModel = CartModel.getSessionCart();

    if (cart.getItems().length > 0) {
      return this.handleRoleRoute()
    }

    if (!this.auth.isLogin) {
      this.logout()
      return
    }
    if (this.auth.socialUser) {
      this.googleService.loginGoogle().subscribe()
    }

    return this.handleRoleRoute()
  }

  // method to navigate according to user role
  public handleRoleRoute(): Promise<boolean> {

    if (!this.auth.user) {
      return this.router.navigateByUrl("home")
    }

    return this.auth.user.isAdmin ?
      this.router.navigateByUrl("home/admin" + environment.productLandingPage)
      : this.router.navigateByUrl("home")
  }

  // method to logout
  public logout(): Promise<boolean> {

    if (this.auth.socialUser) {
      this.googleService.logoutGoogle().subscribe()
    }


    this.store.dispatch(new AuthActions.Logout())
    this.store.dispatch(new CartActions.ResetCart())
    return this.router.navigateByUrl(`/`)
  }

  // end of login/register logic

}
