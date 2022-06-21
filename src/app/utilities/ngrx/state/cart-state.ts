import { CartModel } from "src/app/feat-modules/cart/components/cart-list/cart.model"

export class CartState {

  public cart: CartModel

  constructor() {

    this.cart = CartModel.getSessionCart()

  }
}

