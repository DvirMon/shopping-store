import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from '../services/dialog.service';

import { environment } from 'src/environments/environment';

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
      
      spinnerRef.close()
      
      console.log(error);

      if (error.status === 401 || error.status === 409) {
        return
      }
      
      console.log(error);
      
      environment.production
      ? this.dialogService.handleErrorDialog(this.dialogService.errorData) 
      : this.dialogService.handleErrorDialog(error)
    }
    else {

      spinnerRef.close() 

      // this.dialogService.handleErrorDialog(this.dialogService.errorData)
      console.error(error);

    }
  }

}
