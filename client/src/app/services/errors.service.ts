import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {


  constructor(
    private dialogService: DialogService
  ) {

  }

  public handleError(error) {

    console.log(error.message)

    if (error instanceof HttpErrorResponse) {

      
      if (error.status === 409) {
        return
      } 
      this.dialogService.handleErrorDialog(error);
    }
    else {
      this.dialogService.handleErrorDialog(error);
      console.error(error);
    }
  }

}
