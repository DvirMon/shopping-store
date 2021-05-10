import { CartModel } from "../../models/cart-model";
import { CartActions } from "../action";
import { CartState } from "../state/cart-state";
import * as ActionType from "../action-type";

export function cartReducer(oldState = new CartState(), action: CartActions) {

  let newState = { ...oldState }

  switch (action.type) {
    case ActionType.ADD_CART: {
      newState.cart = CartModel.create(action.payload)
      break
    }
    case ActionType.ADD_CART_ITEMS: {

      const cart = new CartModel()
      cart.setItems(action.payload)
      newState.cart = cart
      break
    }
  }

  return newState


}
