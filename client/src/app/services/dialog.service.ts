import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { ProductData } from './products.service';

import { DialogComponent } from 'src/app/share-components/components/dialog/dialog.component';
import { ProductsDialogComponent } from 'src/app/products/components/products-dialog/products-dialog.component';
import { OrderDialogComponent } from 'src/app/order/components/order-dialog/order-dialog.component';
import { AuthDialogComponent } from 'src/app/auth/components/auth-dialog/auth-dialog.component';


export interface DialogData {
  type: string
  payload: any
}

export interface ErrorData {
  error?: string,
  message: string,
  status: any
}

@Injectable({
  providedIn: 'root',
})


export class DialogService {

  public errorData: ErrorData = {
    message: "An error has occurred please try again later",
    status: null
  }

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    @Inject(MAT_DIALOG_DEFAULT_OPTIONS) private dialogConfig: MatDialogConfig
  ) { }




  // open spinner dialog
  public openSpinner(): MatDialogRef<DialogComponent> {
    const data = this.handleDate("spinner")
    return this.dialog.open(DialogComponent, this.handleConfig(data));
  }

  // open error dialog
  public handleErrorDialog(error: HttpErrorResponse | ErrorData) {
    const payload = this.handleErrorData(error)
    const data = this.handleDate("error", payload)
    this.dialog.open(DialogComponent, this.handleConfig(data))
  }

  // open product dialog
  public handleProductDialog(payload: ProductData): void {
    const data = this.handleDate("product", payload)
    this.dialog.open(ProductsDialogComponent, this.handleConfig(data))
  }

  // open product dialog
  public handleOrderDialog(): void {
    const data = this.handleDate("order")
    this.dialog.open(OrderDialogComponent, this.handleConfig(data))
  }

  // open auth dialog
  public handleAuthDialog(): void {
    const data = this.handleDate("auth")
    this.dialog.open(AuthDialogComponent, this.handleConfig(data))
  }
  // open auth dialog
  public handleLoginDialog(): boolean {
    const data = this.handleDate("auth", true)
    this.dialog.open(AuthDialogComponent, this.handleConfig(data))
    return false
  }

  // handle dialog data
  private handleDate(type: string, payload?: any): DialogData {
    const data = { ...this.data }
    data.type = type
    data.payload = payload
    return data
  }

  // handle dialog configuration
  private handleConfig(data: DialogData): MatDialogConfig {

    const dialogConfig = { ...this.dialogConfig }

    switch (data.type) {
      case "error":
        dialogConfig.height = 'auto'
        dialogConfig.width = '450px'
        dialogConfig.disableClose = true;
        dialogConfig.data = data
        dialogConfig.panelClass = "dialog-error"
        break
        case "order":
          dialogConfig.height = '200px'
        dialogConfig.width = '450px'
        dialogConfig.hasBackdrop = true;
        dialogConfig.disableClose = true;
        dialogConfig.panelClass = "dialog-order"
        break
        case "auth":
          dialogConfig.height = 'auto'
          dialogConfig.width = '450px'
          dialogConfig.hasBackdrop = true;
          dialogConfig.disableClose = true;
          dialogConfig.data = data
        dialogConfig.panelClass = "dialog-auth"
        break
      case "spinner":
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = true;
        dialogConfig.data = data;
        dialogConfig.panelClass = "dialog-spinner"
        break
      case "product":
        dialogConfig.height = '600px'
        dialogConfig.width = '880px'
        dialogConfig.hasBackdrop = true;
        dialogConfig.autoFocus = false;
        dialogConfig.disableClose = false;
        dialogConfig.data = data;
        dialogConfig.panelClass = "dialog-product"
        break
    }

    return dialogConfig
  }


  private handleErrorData(error: HttpErrorResponse | ErrorData): ErrorData {

    let message = ''
    const status = error.status ? error.status : null

    switch (status) {
      case 0:
        message = "You are not connected to database"
        break
      case 500:
        message = this.errorData.message
        break
      case 409:
        message = error.error
        break
      default:
        message = error?.message ? error.message : this.errorData.message
    }
    return { message, status }
  }

}
