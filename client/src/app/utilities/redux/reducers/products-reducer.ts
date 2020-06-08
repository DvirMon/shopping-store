import { ProductsAppState } from '../app-state/products-state';
import { ActionType } from '../action-type';
import { Action } from '../action';
import { ProductModel } from '../../models/product-model';

export const productsReducer = (oldAppState = new ProductsAppState(), action: Action): ProductsAppState => {

  const newAppState = { ...oldAppState }

  switch (action.type) {
    case ActionType.SetProducts:
      newAppState[action.payload.alias].products = action.payload.products
      break;
    case ActionType.SetProducts:
      newAppState[action.payload.alias].products = action.payload.products
      break;
    case ActionType.GetCategories:
      newAppState.categories = action.payload;
      break;
    case ActionType.SetProductsPaginationData:
      newAppState[action.payload.alias].products = action.payload.products
      newAppState[action.payload.alias].pagination = action.payload.pagination;
      newAppState[action.payload.alias].pages.push(action.payload.pagination.pageIndex)
      break;
      case ActionType.AddProductsPaginationData:
        newAppState[action.payload.alias].products = newAppState[action.payload.alias].products.concat(action.payload.products)
        newAppState[action.payload.alias].pages.push(action.payload.pagination.pageIndex)
      break;
    case ActionType.AddProduct:
      newAppState[action.payload.alias].products.push(action.payload.product)
      break;
    case ActionType.UpdateProduct:
      updateLogic(newAppState, action.payload.product, action.payload.alias)
      break
  }
  return newAppState

}

const updateLogic = (newAppState: ProductsAppState, payload: ProductModel, alias: string) => {
  newAppState[alias].products.find(itemToUpdate => {
    if (itemToUpdate._id === payload._id) {
      for (const prop in payload) {
        if (prop in itemToUpdate) {
          itemToUpdate[prop] = payload[prop]
        }
      }
    }
  })
}
