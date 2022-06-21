import { ActionReducerMap } from "@ngrx/store";

import { authReducer } from "./reducers/auth-reducer";
import { cartReducer } from "./reducers/cart-reducer";
import { orderReducer } from "./reducers/order.reducer";
import { productsReducer } from "./reducers/products-reducer";

import { AuthState } from "./state/auth-state";
import { CartState } from "./state/cart-state";
import { OrderState } from "./state/orders.state";
import { ProductsState } from "./state/products-state";


export interface AppState {
  cart: CartState,
  auth: AuthState,
  order : OrderState,
  products : ProductsState
}

export const appReducer: ActionReducerMap<AppState> = {
  cart: cartReducer,
  auth: authReducer,
  order : orderReducer,
  products : productsReducer
}
