import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { TokenService } from '../../services/token.service';
import { DialogService } from '../../services/dialog.service';

import { store } from '../redux/store';
import { AuthService } from 'src/app/services/auth.service';
import { ResetModel } from 'src/app/services/reset.service';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

  private token: string
  private bearer: string

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private dialogService: DialogService
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.handleToken(request)

    const modified = request.clone({

      headers: new HttpHeaders({
        'Authorization': `${this.bearer} : ${this.token}`
      })

    });

    return this.handAuthInterceptor(modified, next)

  }

  private handAuthInterceptor(clone: HttpRequest<any>, next: HttpHandler) {
    return next.handle(clone).pipe(

      catchError((error: HttpErrorResponse) => {

        // in case if auth error
        if (error.status === 401) {

          // if user is not login
          if (!store.getState().auth.isLogin) {
            this.authService.logout()
            return
          }

          // if refresh token expired and user is login - open dialog for user
          if (clone.url.includes("access-token")) {
            this.dialogService.handleAuthDialog()
            return
          }

          // if access token expired - get new access token and repeat request
          return this.tokenService.getAccessToken().pipe(
            switchMap(response => {
              return this.intercept(clone, next)
            })
          )
        }

        return throwError(error);
      }))
  }

  private handleToken(request: HttpRequest<any>) {

    console.log(request.url)

    const confirmation : ResetModel = JSON.parse(sessionStorage.getItem("confirmation"))

    console.log(confirmation)

    if (confirmation) {

      this.token = confirmation.token
      this.bearer = "Bearer-Confirmation"
      return
    }


    if (request.url.includes("access-token")) {
      this.token = store.getState().auth.refreshToken
      this.bearer = "Bearer-RefreshToken"
      return
    }

    this.token = store.getState().auth.accessToken
    this.bearer = "Bearer-AccessToken"
    return
  }

}
