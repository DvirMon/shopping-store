import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {


  constructor(
    private authService: AuthService
  ) {

  }

  public handleError(error) {

    if (error instanceof HttpErrorResponse) {

      if (error.status === 409) {
        return
      }
    }
    else {
      console.error(error);
    }
  }

}
