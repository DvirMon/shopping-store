import { Action } from '@ngrx/store'
import { CategoryModel } from '../../models/category-model'
import { PageModel } from '../../models/pagination-model'
import { ProductModel } from '../../models/product-model'
import { ProductsActionType } from '../action-type'


export class SetCategories implements Action {

  public readonly type = ProductsActionType.SET_CATEGORIES

  constructor(public payload: CategoryModel[]) { }
}

export class SetPage implements Action {

  public readonly type = ProductsActionType.SET_PRODUCTS_PAGINATION

  constructor(public payload: { page: PageModel, alias: string }) { }
}

export class AddPage implements Action {

  public readonly type = ProductsActionType.ADD_PRODUCTS_PAGINATION

  constructor(public payload: { page: PageModel, alias: string }) { }
}

export class AddProduct implements Action {

  public readonly type = ProductsActionType.ADD_PRODUCT

  constructor(public payload: { product: ProductModel, alias: string }) { }

}

export class UpdateProduct implements Action {

  public readonly type = ProductsActionType.UPDATE_PRODUCT

  constructor(public payload: { product: ProductModel, alias: string }) { }

}

export type ProductsActions =
  | SetCategories
  | SetPage
  | AddPage
  | AddProduct
  | UpdateProduct
