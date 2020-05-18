import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DialogComponent } from '../share-modules/dialog/dialog.component';
import { DialogModel, SpinnerDialogData } from '../models/dialog-model';
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
  public spinnerData: DialogModel = new SpinnerDialogData("spinner")
  public dialogData: DialogModel = new DialogModel("dialog")
  public productData: DialogModel = new DialogModel("product")


  // main function for opening dialog
  public openDialog(component, data: any) {
    this.dialog.open(component, this.handleConfig(data));
  }

  // open error dialog
  public handleErrorDialog(error: HttpErrorResponse) {
    this.openDialog(DialogComponent, this.handleErrorData(error))
  }

  // open spinner dialog
  public handleSpinnerDialog() {
    this.openDialog(DialogComponent, this.spinnerData)
  }

  // open product dialog
  public handleProductDialog(product: ProductModel) {
    // this.dialog.open(ProductsDialogComponent);
    this.openDialog(ProductsDialogComponent, this.handleProductData(product))
  }

  // handle dialog configuration
  private handleConfig(data: any): MatDialogConfig {

    const dialogConfig = { ...this.dialogConfig }

    switch (data.type) {
      case "dialog":
        dialogConfig.height = 'auto'
        dialogConfig.width = '450px'
        dialogConfig.data = data
        dialogConfig.panelClass = "dialog-error"
        break
      case "spinner":
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.spinnerData;
        dialogConfig.panelClass = "dialog-spinner"
        break
      case "product":
        dialogConfig.height = '500px'
        dialogConfig.width = '650px'
        dialogConfig.data = data;
        dialogConfig.panelClass = "product-spinner"
        break
    }



    // if (data.type === "dialog") {
    //   dialogConfig.height = 'auto'
    //   dialogConfig.width = '450px'
    //   dialogConfig.data = data
    //   dialogConfig.panelClass = "dialog-error"
    // }

    // else {
    //   dialogConfig.disableClose = true;
    //   dialogConfig.autoFocus = true;
    //   dialogConfig.data = this.spinnerData;
    //   dialogConfig.panelClass = "dialog-spinner"
    // }

    return dialogConfig
  }


  public handleProductData(product: ProductModel): DialogModel {
    const data = { ...this.productData }
    return data
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
