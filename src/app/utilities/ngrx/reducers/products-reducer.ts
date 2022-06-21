import { ProductsState } from '../state/products-state';
import { ProductsActions } from '../actions/products.actions';
import { ProductsActionType } from '../action-type';
import { ProductModel } from 'src/app/feat-modules/products/product-model';

export const productsReducer = (oldAppState = new ProductsState(), action: ProductsActions): ProductsState => {

  const newState = { ...oldAppState }

  switch (action.type) {
    case ProductsActionType.SET_CATEGORIES:
      newState.categories = action.payload;
      break;
    case ProductsActionType.SET_PRODUCTS_PAGINATION:

      const alias = action.payload.alias
      newState[alias] = [action.payload.page]
      break;
    case ProductsActionType.ADD_PRODUCTS_PAGINATION:
      const pages = [...newState[action.payload.alias]]

      pages.push(action.payload.page)

      newState[action.payload.alias] = pages

      break;
    case ProductsActionType.ADD_PRODUCT:
      newState[action.payload.alias].products.push(action.payload.product)
      break;
    case ProductsActionType.UPDATE_PRODUCT:
      updateLogic(newState, action.payload.product, action.payload.alias)
      break
  }
  return newState

}

const updateLogic = (newState: ProductsState, payload: ProductModel, alias: string) => {
  newState[alias].products.find(itemToUpdate => {
    if (itemToUpdate._id === payload._id) {
      for (const prop in payload) {
        if (prop in itemToUpdate) {
          itemToUpdate[prop] = payload[prop]
        }
      }
    }
  })
}
