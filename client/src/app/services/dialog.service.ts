import { Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogComponent } from '../share-modules/dialog/dialog.component';
import { SpinnerDialogData, ErrorDialogData, DialogData, ProductDialogData } from '../models/dialog-model';
import { ProductsDialogComponent } from '../products/components/products-dialog/products-dialog.component';
import { ProductModel } from '../models/product-model';


@Injectable({
  providedIn: 'root',
})

export class DialogService {

  constructor(
    // @Inject(MAT_DIALOG_DATA) public spinnerData: DialogData,
    public dialog: MatDialog,
  ) { }

  public dialogConfig: MatDialogConfig = new MatDialogConfig()
  public spinnerData: DialogData  = new SpinnerDialogData(); 
  public errorData: ErrorDialogData = new ErrorDialogData()
  public productData: ProductDialogData = new ProductDialogData()


  // main function for opening dialog
  public openDialog(component, data: any) {
   return this.dialog.open(component, this.handleConfig(data));
  }
 
  // open error dialog
  public handleErrorDialog(error: HttpErrorResponse) {
    this.openDialog(DialogComponent, this.handleErrorData(error))
  }

  // open spinner dialog
  public handleSpinnerDialog() {
    return this.openDialog(DialogComponent, this.spinnerData)
  }

  // open product dialog
  public handleProductDialog(product: ProductModel) {
    this.openDialog(ProductsDialogComponent, this.handleProductData(product))
  }

  // handle dialog configuration
  private handleConfig(data: DialogData): MatDialogConfig {

    const dialogConfig = { ...this.dialogConfig }

    switch (data.type) {
      case "error":
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

    return dialogConfig
  }


  public handleProductData(product: ProductModel): ProductDialogData {
    const data = { ...this.productData }
    data.product = product
    return data
  }


  public handleErrorData(error: HttpErrorResponse): ErrorDialogData {
    const data = { ...this.errorData }
    this.handleErrorMessage(error)
    data.reason = error?.message ? error.message : 'Error'
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
