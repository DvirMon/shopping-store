import { CartItemModel } from './cart-item-model'

export class CartModel {

  public constructor(
    public _id?: string, 
    public userId? : string,
    public isActive?: boolean,
    public createDate?: Date
  ) { }
}

export class CurrentCartModel {
  public price?: number
  public cartItems?: CartItemModel[]
}