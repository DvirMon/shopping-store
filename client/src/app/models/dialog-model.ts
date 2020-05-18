import { ProductModel } from './product-model';
import { Injectable } from '@angular/core';


export abstract class DialogData {
  constructor(public type?: string) { }
}

export class ProductDialogData extends DialogData {

  constructor(
    type?: string,
    public product?: ProductModel,
  ) {
    super(type)
    this.type = "product"
  }
}

export class SpinnerDialogData extends DialogData {
  constructor(
    type?: string
  ) {
    super(type)
    this.type = "spinner"
  }
}

export class ErrorDialogData extends DialogData {

  constructor(
    type?,
    public reason?: string,
    public status?: number
  ) {
    super(type)
    this.type = "error"
  }


}