import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { store } from '../redux/store';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DialogService } from '../services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private token: string
  public bearer: string 

  constructor(
    private dialogService: DialogService,

  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = store.getState().auth.accessToken
    this.bearer = "Bearer-AccessToken"

    if (request.url === "http://localhost:4000/api/auth/access-token") {
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

    return next.handle(modified)  }

 
}
