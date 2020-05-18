
import { Action } from "../action";
import { ActionType } from "../action-type";
import { CartAppState } from '../app-state/cart-state';


export const cartReducer = (oldAppState = new CartAppState(), action: Action): CartAppState => {

  const newAppState = { ...oldAppState }

  switch (action.type) {
    case ActionType.AddCart:
      newAppState.cart = action.payload
      break
    case ActionType.IsCartActive:
      newAppState.isCartActive = action.payload
      break
    case ActionType.SetCartItems:
      newAppState.cartItems = action.payload
      break
    case ActionType.AddCartItem:
      newAppState.cartItems.push(action.payload)
      break
  }
  return newAppState
}
