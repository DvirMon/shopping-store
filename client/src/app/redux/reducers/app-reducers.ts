import { combineReducers } from "redux";
import { authReducer } from './auth-reducer'
import { cartReducer } from './cart-reducer'
import { receiptReducer } from './receipt-reducer';
import { productsReducer } from './products-reducer';


export const reducers = combineReducers({
  auth: authReducer,
  cart: cartReducer, 
  receipt : receiptReducer,
  products : productsReducer
})  