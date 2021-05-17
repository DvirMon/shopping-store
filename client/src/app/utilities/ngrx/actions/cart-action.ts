import { Action } from "@ngrx/store";
import { CurrentItemModel } from "../../models/cart-item-model";
import { CartModel } from "../../models/cart-model";
import { CartActionType } from "../action-type";

export class AddCart implements Action {

  public type = CartActionType.ADD_CART

  constructor
    (
      public payload?: any
    ) { }
}

export class SetCartItems implements Action {

  readonly type = CartActionType.SET_CART_ITEMS

  constructor
    (
      public payload?: any[]
    ) { }
}

export class AddCartItem implements Action {

  readonly type = CartActionType.ADD_CART_ITEM

  constructor
    (public payload?: any) { }
}

export class UpdateCartItem implements Action {

  readonly type = CartActionType.UPDATE_CART_ITEM

  constructor
    (public payload?: any) { }
}

export class DeleteCartItem implements Action {

  readonly type = CartActionType.DELETE_CART_ITEM

  constructor
    (public payload?: any) { }
}

export class DeleteCart implements Action {
  readonly type = CartActionType.DELETE_CART
}

export type CartActions =
  AddCart |
  SetCartItems |
  AddCartItem |
  UpdateCartItem |
  DeleteCartItem |
  DeleteCart
