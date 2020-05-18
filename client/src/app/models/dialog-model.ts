import { ProductModel } from './product-model';

export class DialogModel {
  constructor(public type?: string, public reason?: string, public status?: number) { }
}

export abstract class DialogData {
  constructor(public type?: string) { }
}

export class ProductDialogData extends DialogData {

  constructor(
    public product: ProductModel,
    type: string
  ) {
    super(type)
    this.type = "product"
  }
}

export class SpinnerDialogData extends DialogData {
  constructor(
    type: string
  ) {
    super(type)
    this.type = "spinner"
  }
}

export class ErrorDialogModel extends DialogData {

  constructor(type, public reason?: string, public status?: number) {
    super(type)
    this.type = "error"
  }


}