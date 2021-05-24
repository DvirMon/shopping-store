import { ActionReducerMap } from "@ngrx/store";
import { authReducer } from "./reducers/auth-reducer";
import { cartReducer } from "./reducers/cart-reducer";
import { AuthState } from "./state/auth-state";
import { CartState } from "./state/cart-state";

export const store = {
  cart: cartReducer,
  auth: authReducer
}

export interface AppState {
  cart: CartState,
  auth: AuthState
}

export const appReducer: ActionReducerMap<AppState> = {
  cart: cartReducer,
  auth: authReducer
}
