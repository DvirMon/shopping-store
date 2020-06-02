
import { Action } from "../action";
import { ActionType } from "../action-type";
import { CartAppState } from '../app-state/cart-state';
import { CartModel } from 'src/app/utilities/models/cart-model';


export const cartReducer = (oldAppState = new CartAppState(), action: Action): CartAppState => {

  let newAppState = { ...oldAppState }

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
    case ActionType.SetCartPrice:
      newAppState.cartTotalPrice = action.payload
      break
    case ActionType.AddCartItem:
      newAppState.cartItems.push(action.payload)
      break
    case ActionType.UpdatedItemCart:
      updateLogic(newAppState, action.payload)
      break
    case ActionType.ResetCartState:
      newAppState = new CartAppState()
      break
    case ActionType.DeleteCartItem:
      const indexToDelete = newAppState.cartItems.findIndex(doc => doc._id === action.payload)
      if (indexToDelete >= 0) {
        newAppState.cartItems.splice(indexToDelete, 1)
      }
      break
    case ActionType.Logout:
      newAppState = new CartAppState()
  }
  return newAppState
}

const updateLogic = (newAppState: CartAppState, payload: CartModel) => {
  newAppState.cartItems.find(itemToUpdate => {
    if (itemToUpdate._id === payload._id) {
      for (const prop in payload) {
        if (prop in itemToUpdate) {
          itemToUpdate[prop] = payload[prop]
        }
      }
    }
  })
}
