import { combineReducers } from "redux";
import { receiptReducer } from './receipt-reducer';
import { productsReducer } from './products-reducer';


export const reducers = combineReducers({
  // auth: authReducer,
  receipt : receiptReducer,
  products : productsReducer
})
