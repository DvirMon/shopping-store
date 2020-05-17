import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { store } from '../redux/store';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private token: string
  private contentType: string
  public bearer: string = "Bearer-AccessToken"

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private authService: AuthService

  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    this.token = store.getState().auth.accessToken

    if (request.url === "http://localhost:4000/api/auth/access-token") {
      console.log(1)
      this.token = store.getState().auth.refreshToken
      this.bearer = "Bearer-RefreshToken"
    }
    
    const modified = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${this.bearer} : ${this.token}`
      })
      
    });
    console.log(modified)
    // this.dialogService.handleSpinnerDialog();

    return this.handInterceptor(next, modified)
  }


  public handInterceptor(next, clone) {
    return next.handle(clone).pipe(
      tap(
        (event: HttpEvent<any>) => {

          if (event instanceof HttpResponse) {

            // this.dialogService.dialog.closeAll()
          }

          return event;
        }),
      catchError((error: HttpErrorResponse) => {

        // this.dialogService.dialog.closeAll()

        return throwError(error);
      }))
  }

  private handleTokenExpired(error) {
    if (error.status === 401 && store.getState().auth.isLogin) {
      this.authService.getAccessToken().subscribe(
        (response) => console.log(response),
        (err) => console.log(err)
      )
    }
  }

}
