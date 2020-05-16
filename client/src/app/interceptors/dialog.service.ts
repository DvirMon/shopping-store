import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DialogComponent } from '../share-modules/dialog/dialog.component';
import { DialogModel } from '../models/dialog-model';



@Injectable({
  providedIn: 'root',
})

export class DialogService {

  constructor(
    public dialog: MatDialog,
  ) { }

  public dialogConfig: MatDialogConfig = new MatDialogConfig()
  public spinnerData: DialogModel = new DialogModel("spinner")
  public dialogData: DialogModel = new DialogModel("dialog")


  // main function for opening dialog
  public openDialog(data: DialogModel): void {
    this.dialog.open(DialogComponent, this.handleConfig(data));
  }

  // open error dialog
  public handleErrorDialog(error: HttpErrorResponse) {
    this.openDialog(this.handleErrorData(error)
    )
  }

  // open success dialog
  public handleSuccessDialog(message: string) {
    const data = { ...this.dialogData }
    data.reason = message
    this.openDialog(data);
  }

  // open spinner dialog
  public handleSpinnerDialog() {
    this.openDialog(this.spinnerData)
  }


  private handleConfig(data: DialogModel): MatDialogConfig {

    const dialogConfig = { ...this.dialogConfig }

    if (data.type === "dialog") {
      dialogConfig.height = 'auto'
      dialogConfig.width = '450px'
      dialogConfig.data = data
      dialogConfig.panelClass = "dialog-error"
    }

    else {
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.spinnerData;
      dialogConfig.panelClass = "dialog-spinner"
    }

    return dialogConfig
  }


  public handleErrorData(error: HttpErrorResponse): DialogModel {
    const data = { ...this.dialogData }
    this.handleErrorMessage(error)
    data.reason = error?.message ? error.message : ''
    data.status = error.status ? error.status : null
    return data
  }


  public handleErrorMessage(error: any) {
    switch (error.status) {
      case 0:
        error.message = "You are not connected to database"
        break
      default:
        error.message = error.error
    }
    return error
  }

}
