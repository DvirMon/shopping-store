import { authReducer } from "./reducers/auth-reducer";
import { cartReducer } from "./reducers/cart-reducer";

export const ngrxStore = {
  cart: cartReducer,
  auth : authReducer
}
