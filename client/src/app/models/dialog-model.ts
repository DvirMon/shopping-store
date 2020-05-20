import { ProductModel } from './product-model';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Injectable, Inject } from '@angular/core';


export abstract class Dialog {
  constructor(
    public dialog: MatDialog,
    public data: DialogData
  ) { }

}

export interface DialogData {
  type: string
  status?: number
  message?: string
  product?: ProductModel
}

@Injectable({
  providedIn: 'root',
})
export class ProductDialog extends Dialog {

  constructor(
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
  ) {
    super(dialog, { type: "product" })
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpinnerDialog extends Dialog {
  constructor(
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
  ) {
    super(dialog, { type: "spinner" })
  }

}

@Injectable({
  providedIn: 'root',
})
export class ErrorDialog extends Dialog {

  constructor(
    dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
  ) {
    super(dialog, { type: "error" })
  }



}