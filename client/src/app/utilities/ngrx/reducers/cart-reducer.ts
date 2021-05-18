import { cartState } from "../state/cart-state";
import { CartActions } from "../actions/cart-action";
import { CartActionType } from "../action-type";

import { CartModel } from "../../models/cart-model";

export function cartReducer(oldState = cartState, action: CartActions) {

  let newState: CartModel = CartModel.create(oldState)
  const cart: CartModel = CartModel.create(oldState)

  switch (action.type) {
    case CartActionType.ADD_CART: {
      newState = CartModel.create(action.payload)
      break
    }
    case CartActionType.SET_CART_ITEMS: {

      cart.setItems(action.payload)
      newState = cart

      break
    }
    case CartActionType.ADD_CART_ITEM: {

      cart.addItem(action.payload)
      newState = cart
      break
    }
    case CartActionType.UPDATE_CART_ITEM: {
      cart.updateItem(action.payload)
      newState = cart
      break
    }
    case CartActionType.DELETE_CART_ITEM: {
      cart.deleteitem(action.payload)
      newState = cart
      break
    }
    case CartActionType.DELETE_CART: {
      cart.setItems([])
      newState = cart
      break
    }
    case CartActionType.RESET_CART: {
      sessionStorage.clear()
      newState = new CartModel()
      break
    }
  }



  return newState


}
