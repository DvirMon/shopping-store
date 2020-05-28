import { ProductsAppState } from '../app-state/products-state';
import { ActionType } from '../action-type';
import { Action } from '../action';

export const productsReducer = (oldAppState = new ProductsAppState(), action: Action): ProductsAppState => {

  const newAppState = { ...oldAppState }

  switch (action.type) {
    case ActionType.GetCategories:
      newAppState.categories = action.payload;
      break
    case ActionType.GetProducts:
      newAppState[action.payload.alias] = action.payload.products;
      break
    case ActionType.AddProduct:
      newAppState[action.payload.alias].push(action.payload);
      break
  }
  return newAppState

}