import { ProductModel } from "../../../products/product-model";

export class CartItemModel {

  public constructor(
    public _id?: string,
    public productRef?: string,
    public quantity?: number,
    public cartId?: string,
  ) { }

  static create(currentItem: CurrentItemModel): CartItemModel {
    return new CartItemModel(currentItem._id, currentItem.productRef._id, currentItem.quantity, currentItem.cartId)
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
