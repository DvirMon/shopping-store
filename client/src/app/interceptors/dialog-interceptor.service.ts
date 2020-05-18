import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { DialogService } from '../services/dialog.service';
import { DialogComponent } from '../share-modules/dialog/dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogInterceptorService implements HttpInterceptor {


  constructor(
    private dialogService: DialogService,

  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    this.dialogService.handleSpinnerDialog();
    const modified = request.clone({});
    return this.handInterceptor(next, modified)
  }

  public handInterceptor(next, clone) {
    return next.handle(clone).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.dialogService.dialog.closeAll()
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.dialogService.dialog.closeAll()
        return throwError(error);
      }))
  }


}
