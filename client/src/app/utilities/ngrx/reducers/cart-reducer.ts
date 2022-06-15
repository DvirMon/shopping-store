import { CartState } from "../state/cart-state";
import { CartActions } from "../actions/cart-action";
import { CartActionType } from "../action-type";
import { CartModel } from "src/app/feat-modules/cart/components/cart-list/cart.model";


export function cartReducer(oldState = new CartState(), action: CartActions) {

  const newState: CartState = { ...oldState }
  const cart: CartModel = CartModel.create(oldState.cart)


  switch (action.type) {
    case CartActionType.ADD_CART: {
      newState.cart = CartModel.create(action.payload)
      break
    }
    case CartActionType.SET_CART_ITEMS: {

      cart.setItems(action.payload)
      newState.cart = cart

      break
    }
    case CartActionType.ADD_CART_ITEM: {

      cart.addItem(action.payload)
      newState.cart = cart
      break
    }
    case CartActionType.UPDATE_CART_ITEM: {
      cart.updateItem(action.payload)
      newState.cart = cart
      break
    }
    case CartActionType.DELETE_CART_ITEM: {
      cart.deleteitem(action.payload)
      newState.cart = cart
      break
    }
    case CartActionType.DELETE_CART: {
      cart.setItems([])
      newState.cart = cart
      break
    }
    case CartActionType.RESET_CART: {
      newState.cart = new CartModel()
      break
    }
  }



  return { ...newState }


}
