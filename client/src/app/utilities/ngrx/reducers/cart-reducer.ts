import { CartModel } from "../../models/cart-model";
import { CartActions } from "../action";
import { CartActionType } from "../action-type";
import { cartState } from "../state/cart-state";

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
      console.log(cart)
      newState = cart
      console.log(newState)

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
  }

  return newState


}
