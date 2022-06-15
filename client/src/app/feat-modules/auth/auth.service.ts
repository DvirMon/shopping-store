import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SocialUser } from 'angularx-social-login';

// SERVICES

// MODELS

import { Subject, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { CartModel } from '../cart/components/cart-list/cart.model';

// NGRX
import { Store } from '@ngrx/store';


import * as  AuthActions from "../../utilities/ngrx/actions/auth-actions";
import * as  CartActions from "../../utilities/ngrx/actions/cart-action";

import { GoogleService } from 'src/app/services/google.service';
import { TokenService } from 'src/app/services/token.service';
import { User } from 'src/app/utilities/models/user.model';
import { AuthState } from 'src/app/utilities/ngrx/state/auth-state';
import { userSelector } from 'src/app/utilities/ngrx/selectors';

declare const gapi: any;

export interface Login {
  email: string,
  password: string
}

export interface AuthData {
  user: User
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // NGRX
  public auth$: Observable<AuthState> = this.store.select('auth')
  private user$: Observable<User> = this.store.select(userSelector)
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
  public login(payload: Login): Observable<User> {
    return this.handleUser("/login", payload)
  }

  // POST request - http://localhost:3000/api/auth/login/google
  public loginGoogle(): Observable<User> {
    return this.googleService.loginGoogle().pipe(
      switchMap((socialUser: SocialUser) => {
        return this.handleUser("/login/google", socialUser)
      })
    )
  }

  // POST request - http://localhost:3000/api/auth/register
  public register(registerInfo: User): Observable<User> {
    return this.handleUser("/register", registerInfo)
  }

  // LOGIC SECTION

  // generic method to user login/register
  private handleUser(path: string, data: any): Observable<User | null> {

    //  handle recaptcha
    return this.googleService.getReCaptcha('login')
      .pipe(
        switchMap((reCaptcha: string) => {

          // send auth data to server
          return this.getUser(path, data, reCaptcha)
        }))
      .pipe(
        switchMap(({ token }: AuthData) => {

          this.store.dispatch(new AuthActions.AddAccessToken(token))

          // handle server response
          return this.getRefreshToken()
        })
      )
  }

  // POST request - meim http method to login and register
  private getUser(path: string, data: any, reCaptcha: string): Observable<AuthData> {
    return this.http.post<AuthData>(this.url + path, { data, reCaptcha })
  }

  // method to set refresh token and user in store
  private getRefreshToken(): Observable<User> {
    return this.tokenService.getRefreshToken()
      .pipe(
        map((auth: AuthData) => {
          return this.handleUserData(auth);
        }))
  }

  // set user data in store
  private handleUserData(auth: AuthData): User {
    this.store.dispatch(new AuthActions.AddRefreshToken(auth.token));
    this.store.dispatch(new AuthActions.Login(auth));
    sessionStorage.setItem("user", JSON.stringify(auth.user));
    return this.auth.user;
  }


  // method to auto login
  public autoLogin(): Promise<boolean> {

    const cart: CartModel = CartModel.getSessionCart();

    if (cart.getItems().length > 0) {
      return this.handleRoleRoute()
    }

    if (!this.auth.isLogin) {
      return this.logout()
    }

    if (this.auth.socialUser) {
      this.googleService.loginGoogle().subscribe()
    }

    return this.handleRoleRoute()
  }

  // method to navigate according to user role
  public handleRoleRoute(): Promise<boolean> {

    if (!this.auth.user) {
      return this.router.navigateByUrl("auth/login")
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

    return this.router.navigateByUrl(`/auth/login`)
  }

}
