import { ActionReducerMap } from "@ngrx/store";

import { authReducer } from "./reducers/auth-reducer";
import { cartReducer } from "./reducers/cart-reducer";
import { orderReducer } from "./reducers/order.reducer";

import { AuthState } from "./state/auth-state";
import { CartState } from "./state/cart-state";
import { OrderState } from "./state/orders.state";


export interface AppState {
  cart: CartState,
  auth: AuthState,
  order : OrderState 
}

export const appReducer: ActionReducerMap<AppState> = {
  cart: cartReducer,
  auth: authReducer,
  order : orderReducer
}
