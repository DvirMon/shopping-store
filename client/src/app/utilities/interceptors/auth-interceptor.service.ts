import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { store } from '../redux/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';

@Injectable({
  providedIn: 'root'
})


export class AuthInterceptorService implements HttpInterceptor {

  private token: string
  public bearer: string


  constructor(
    private authService: AuthService,
    private dialogService: DialogService
  ) {

  }

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

        if (error.status === 401) {

          // if user is not login
          if (!store.getState().auth.isLogin) {
            this.authService.logout()
            return
          }

          // if refresh token expired and user is login - login again and repeat request
          if (clone.url.includes("access-token")) {
            this.dialogService.handleAuthDialog()
            return
          }

          // if access token failed - get new access token and repeat request
          return this.authService.getAccessToken().pipe(
            switchMap(response => {
              return this.intercept(clone, next)
            })
          )

        }
        return throwError(error);
      }))
  }

  private handleToken(request: HttpRequest<any>) {
    this.token = store.getState().auth.accessToken
    this.bearer = "Bearer-AccessToken"

    if (request.url.includes("access-token")) {
      this.token = store.getState().auth.refreshToken
      this.bearer = "Bearer-RefreshToken"
    }

  }


} 
