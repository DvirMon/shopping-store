import { Injectable, Inject, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogComponent } from '../share-modules/dialog/dialog.component';
import { SpinnerDialog, ErrorDialog, DialogData, ProductDialog, Dialog } from '../models/dialog-model';
import { ProductsDialogComponent } from '../products/components/products-dialog/products-dialog.component';
import { ProductModel } from '../models/product-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DialogService {


  constructor(
    public dialog: MatDialog,
    public spinnerRef: MatDialogRef<DialogComponent>,
    private ngZone: NgZone
  ) { }

  public dialogConfig: MatDialogConfig = new MatDialogConfig()
  public spinnerDialog: Dialog = new SpinnerDialog(this.dialog, { type: "spinner" });
  public errorDialog: Dialog = new ErrorDialog(this.dialog, { type: "error" })
  public productDialog: Dialog = new ProductDialog(this.dialog, { type: "product" })


  // open error dialog
  public handleErrorDialog(error: HttpErrorResponse) {
    const data = this.handleErrorData(error)
    this.errorDialog.dialog.open(DialogComponent, this.handleConfig(data))
  }

  // open spinner dialog
  public openSpinner() : MatDialogRef<DialogComponent> {
    const data = this.spinnerDialog.data
    return this.dialog.open(DialogComponent, this.handleConfig(data));
  }

  public closeSpinner() {
    this.spinnerRef.close(true)
  }

  // open product dialog
  public handleProductDialog(product: ProductModel) {
    const data = this.handleProductData(product)
    this.productDialog.dialog.open(ProductsDialogComponent, this.handleConfig(data))
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
        dialogConfig.autoFocus = false;
        dialogConfig.height = '500px'
        dialogConfig.width = '880px'
        dialogConfig.disableClose = false;
        dialogConfig.data = data;
        dialogConfig.panelClass = "dialog-product"
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
