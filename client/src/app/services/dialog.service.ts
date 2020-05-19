import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogComponent } from '../share-modules/dialog/dialog.component';
import { SpinnerDialog, ErrorDialog, DialogData, ProductDialog, Dialog } from '../models/dialog-model';
import { ProductsDialogComponent } from '../products/components/products-dialog/products-dialog.component';
import { ProductModel } from '../models/product-model';


@Injectable({
  providedIn: 'root',
})

export class DialogService {

  constructor(
    public dialog: MatDialog,
  ) { }

  public dialogConfig: MatDialogConfig = new MatDialogConfig()
  public spinnerDialog: Dialog = new SpinnerDialog(this.dialog, { type: "spinner" });
  public errorDialog: Dialog = new ErrorDialog(this.dialog, { type: "error" })
  public productDialog: Dialog = new ProductDialog(this.dialog, { type: "product" })


  // main function for opening dialog
  public openDialog(component, data: DialogData) {
    this.dialog.open(component, this.handleConfig(data));
  }

  // open error dialog
  public handleErrorDialog(error: HttpErrorResponse) {
    const data = this.handleErrorData(error)
    this.errorDialog.dialog.open(DialogComponent, this.handleConfig(data))
  }

  // open spinner dialog
  public handleSpinnerDialog() {
    const data = this.spinnerDialog.data
    this.spinnerDialog.dialog.open(DialogComponent, this.handleConfig(data))
  }

  // open product dialog
  public handleProductDialog(product: ProductModel) {
    const data = this.handleProductData(product)
    this.productDialog.dialog.open(DialogComponent, this.handleConfig(data))
    // this.openDialog(ProductsDialogComponent, this.handleProductData(product))
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
      case "spinner":
        dialogConfig.autoFocus = true;
        dialogConfig.hasBackdrop = false;
        dialogConfig.data = this.spinnerDialog.data;
        dialogConfig.panelClass = "dialog-spinner"
        break
      case "product":
        dialogConfig.height = '500px'
        dialogConfig.width = '650px'
        dialogConfig.disableClose = false;
        dialogConfig.data = data;
        dialogConfig.panelClass = "product-spinner"
        break
    }

    return dialogConfig
  }


  public handleProductData(product: ProductModel): any {
    const data = { ...this.productDialog.data }
    data.product = product
    return data
  }


  public handleErrorData(error: HttpErrorResponse): any {
    const data = { ...this.errorDialog.data }
    this.handleErrorMessage(error)
    data.message = error?.message ? error.message : 'Error'
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
