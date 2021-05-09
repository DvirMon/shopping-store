
import { Action } from "../action";
import { ActionType } from "../action-type";
import { CartAppState } from '../app-state/cart-state';
import { CartModel } from 'src/app/utilities/models/cart-model';


export const cartReducer = (oldAppState = new CartAppState(), action: Action): CartAppState => {

  let newAppState = { ...oldAppState }

  switch (action.type) {
    case ActionType.AddCart:
      newAppState.cart = CartModel.create(action.payload)
      break
    // case ActionType.IsCartActive:
    //   newAppState.cart.setIsActive(action.payload)
    //   break
    case ActionType.SetCartItems:
      newAppState.cart.setItems(action.payload)
      break

    case ActionType.SetCartPrice:
      newAppState.cart.setTotalPrice(action.payload)
      break
    case ActionType.AddCartItem:
      newAppState.cart.addItem(action.payload)
      break

    case ActionType.UpdateCartItem:
      newAppState.cart.updateItem(action.payload);
      break
    case ActionType.ResetCartState:
      newAppState = new CartAppState()
      break
    case ActionType.DeleteCartItem:
      newAppState.cart.deleteitem(action.payload)
      break
    case ActionType.Logout:
      newAppState = new CartAppState()
  }
  return newAppState
}




