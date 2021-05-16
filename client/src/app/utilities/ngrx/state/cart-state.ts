import { CartModel } from 'src/app/utilities/models/cart-model';
import { store } from '../../redux/store';

const isLogin = store.getState().auth.isLogin

let cart: CartModel = new CartModel()


if (!isLogin) {
  cart = CartModel.getSessionCart()
}

export const cartState: CartModel = cart ? cart : new CartModel()

