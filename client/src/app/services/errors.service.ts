import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {


  constructor() {

  }

  public handleError(error) {

    if (error instanceof HttpErrorResponse) {
      if (error.status === 409) {
        console.log(error)
        return
      }
      // this.dialogService.handleErrorDialog(error);
    }
    else {
      console.error(error);
    }
  }

}
