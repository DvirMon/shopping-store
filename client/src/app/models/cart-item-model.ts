import { ProductModel } from './product-model';

export class CartItemModel {

  public constructor(
    public _id? : string,
    public productId?: string,
    public quantity?: number,
    public totalPrice?: number,
    public cartId?: string,
  ) { }
}
