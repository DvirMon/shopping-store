import { CartModel } from 'src/app/utilities/models/cart.model';

export class CartState {

  public cart: CartModel

  constructor() {

    this.cart = CartModel.getSessionCart()

  }
}

 