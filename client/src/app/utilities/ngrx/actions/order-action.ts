import { Action } from "@ngrx/store";
import { OrderHistoryModel } from "../../models/order-model";
import { OrderActionType } from "../action-type";

export class AddOrder implements Action {

  public type = OrderActionType.ADD_ORDER

  constructor
    (
      public payload?: any
    ) { }
}

export class SetHistory implements Action {

  public type = OrderActionType.SET_HISTORY

  constructor
    (
      public payload?: any[]
    ) { }
}
export class SetYears implements Action {

  public type = OrderActionType.SET_YEARS

  constructor
    (
      public payload?: any[]
    ) { }
}

export type OrderActions =
  | AddOrder
  | SetHistory
  | SetYears
