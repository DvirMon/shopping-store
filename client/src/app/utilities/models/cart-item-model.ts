import { ProductModel } from "./product-model";

export class CartItemModel {

  public constructor(
    public _id?: string,
    public productRef?: string,
    public quantity?: number,
    public cartId?: string,
  ) { }

  static create(curentItem: CurrentItemModel): CartItemModel {
    return new CartItemModel(curentItem._id, curentItem.productRef._id, curentItem.quantity, curentItem.cartId)
  }
}

export class CurrentItemModel {
  public constructor(
    public _id?: string,
    public productRef?: ProductModel,
    public quantity?: number,
    public cartId?: string,
  ) { } 

  static create(product: ProductModel, quantity: number, cartId: string): CurrentItemModel {
    return new CurrentItemModel(null, product, quantity, cartId)
  }

}
