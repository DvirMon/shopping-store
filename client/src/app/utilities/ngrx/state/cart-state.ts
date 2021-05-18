import { CartModel } from 'src/app/utilities/models/cart-model';

export const cartState: CartModel = CartModel.getSessionCart()

export class CartState {

  public cart: CartModel

  constructor() {

    this.cart = CartModel.getSessionCart()

  }
}

