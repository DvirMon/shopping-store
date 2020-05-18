import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { DialogService } from '../interceptors/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {


  constructor(
    private dialogService: DialogService
  ) {

  }

  public handleError(error) {



    if (error instanceof HttpErrorResponse) {

      if (error.status === 409) {
        console.log(error)
        return
      } 

      this.dialogService.handleErrorDialog(error);

    }
    else {
      console.error(error);
      this.dialogService.handleErrorDialog(error);
    }
  }

}
