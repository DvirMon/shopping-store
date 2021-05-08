import { ProductModel } from "./product-model";

export class CartItemModel {

  public constructor(
    public _id?: string,
    public productRef?: string,
    public quantity?: number,
    public cartId?: string,
  ) { }

}

export class CurrentItemModel {
  public constructor(
    public _id?: string,
    public productRef?: ProductModel,
    public quantity?: number,
    public cartId?: string,
  ) { }

}
