import { Injectable, NgZone } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { DialogService } from '../../services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {


  constructor(
    private dialogService: DialogService,
    private zone: NgZone,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url === "assets/images/Google__G__Logo.svg") {
      return next.handle(request)
    }

    let spinnerRef;

    this.zone.run(() => {
      spinnerRef = this.dialogService.openSpinner()
    });


    const modified = request.clone({});

    return this.handleSpinnerInterceptor(next, spinnerRef, modified)
  }


  private handleSpinnerInterceptor(next, spinnerRef, clone) {
    return next.handle(clone).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            spinnerRef.close()
          }
        }),
      catchError((error: HttpErrorResponse) => {
        spinnerRef.close()
        return throwError(error);
      }))
  }


}
