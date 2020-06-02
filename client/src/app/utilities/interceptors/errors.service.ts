import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../services/dialog.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {


  constructor(
    private dialogService: DialogService,

  ) {

  }

  public handleError(error) {

    if (error instanceof HttpErrorResponse) {

      console.log(error)
      
      if (error.status === 401 || error.status === 409) {
        return
      }
      
      this.dialogService.handleErrorDialog(error)
    }
    else {
      // this.dialogService.handleErrorDialog(error)
      console.error(error);
    }
  }

}
