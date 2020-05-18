export class CartItemModel {

  public constructor(
    public productId?: string,
    public quantity?: number,
    public totalPrice?: number,
    public cartId?: string,
  ) { }
}