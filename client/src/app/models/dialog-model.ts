import { ProductModel } from './product-model';
import { MatDialog } from '@angular/material/dialog';


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

export class ProductDialog extends Dialog {

  constructor(
    dialog: MatDialog,
    data: DialogData,
  ) {
    super(dialog, data)
    this.data.type = "product"
    this.data.product = new ProductModel()
  }


}

export class SpinnerDialog extends Dialog {
  constructor(
    dialog: MatDialog,
    data: DialogData,
  ) {
    super(dialog, data)
    this.data.type = "spinner"
  }

}

export class ErrorDialog extends Dialog {

  constructor(
    dialog: MatDialog,
    data: DialogData,
  ) {
    super(dialog, data)
    this.data.type = "error"
  }



}