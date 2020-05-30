import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogComponent } from '../../share-components/components/dialog/dialog.component';
import { ProductsDialogComponent } from '../../products/components/products-dialog/products-dialog.component';
import { ProductModel } from '../models/product-model';
import { OrderModel } from '../models/order-model';
import { OrderDialogComponent } from 'src/app/order/components/order-dialog/order-dialog.component';


export interface DialogData {
  type: string
  payload: any
}

@Injectable({
  providedIn: 'root',
})

export class DialogService {


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
  public handleErrorDialog(error: HttpErrorResponse) {
    const data = this.handleDate("error", error)
    this.dialog.open(DialogComponent, this.handleConfig(data))
  }

  // open product dialog
  public handleProductDialog(product: ProductModel) {
    const data = this.handleDate("product", product)
    this.dialog.open(ProductsDialogComponent, this.handleConfig(data))
  }

  // open product dialog
  public handleOrderDialog() {
    const data = this.handleDate("order")
    this.dialog.open(OrderDialogComponent, this.handleConfig(data))
  }

  // open auth dialog
  public handleAuthDialog() {
    const data = this.handleDate("auth")
    this.dialog.open(DialogComponent, this.handleConfig(data))
  }

  // handle dialog data
  private handleDate(type: string, payload?: any): DialogData {

    const data = { ...this.data }

    data.type = type

    if (type === "error") {
      data.payload = this.handleErrorData(payload)
    } else {
      data.payload = payload
    }

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
        dialogConfig.disableClose = false;
        dialogConfig.panelClass = "dialog-order"
        break
      case "auth":
        dialogConfig.height = '300px'
        dialogConfig.width = '450px'
        dialogConfig.hasBackdrop = true;
        dialogConfig.disableClose = false;
        dialogConfig.panelClass = "dialog-auth"
        break
      case "spinner":
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = false;
        dialogConfig.data = data;
        dialogConfig.panelClass = "dialog-spinner"
        break
      case "product":
        dialogConfig.height = '500px'
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


  private handleErrorData(error: HttpErrorResponse) {
    this.handleErrorMessage(error)
    const message = error?.message ? error.message : 'Error'
    const status = error.status ? error.status : null
    return { message, status }
  }


  private handleErrorMessage(error: any) {
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