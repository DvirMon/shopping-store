import { Action } from "@ngrx/store";
import * as ActionType from "./action-type"

export class AddCart implements Action {

  public type = ActionType.ADD_CART

  constructor
    (
      public payload: any
    ) { }


}
export class AddCartItems implements Action {

  public type = ActionType.ADD_CART_ITEMS

  constructor
    (
      public payload: any
    ) { }


}

export type CartActions =
  AddCart |
  AddCartItems
