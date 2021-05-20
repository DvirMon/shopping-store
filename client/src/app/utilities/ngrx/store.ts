import { authReducer } from "./reducers/auth-reducer";
import { cartReducer } from "./reducers/cart-reducer";

export const store = {
  cart: cartReducer,
  auth : authReducer
}
