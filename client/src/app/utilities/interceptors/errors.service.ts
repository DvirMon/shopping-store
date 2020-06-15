import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../services/dialog.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {


  constructor(
    private dialogService: DialogService,
    private ngZone: NgZone,
  ) {

  }

  public handleError(error) {

    
    let spinnerRef;

    this.ngZone.run(() => {
      spinnerRef = this.dialogService.openSpinner()
    });


    if (error instanceof HttpErrorResponse) {

      if (error.status === 401 || error.status === 409) {
        return
      }
      
      spinnerRef.close()
      this.dialogService.handleErrorDialog(error)
    }
    else {
      console.error(error);
    }
  }

}
