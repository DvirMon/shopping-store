
export enum CartActionType {

  ADD_CART = "ADD_CART",
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  ADD_CART_ITEM = 'ADD_CART_ITEM',
  DELETE_CART_ITEM = 'DELETE_CART_ITEM',
  UPDATE_CART_ITEM = 'UPDATE_CART_ITEMS',
  DELETE_CART = 'DELETE_CART',
  RESET_CART = 'RESET_CART'
}

export enum AuthActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  ADD_SOCIEL_USER = "ADD_SOCIEL_USER",
  ADD_ACCESS_TOKEN = "ADD_ACCESS_TOKEN",
  ADD_REFRESH_TOKEN = "ADD_REFRESH_TOKEN",
}

export enum OrderActionType {
  ADD_ORDER = "ADD_ORDER",
  SET_HISTORY = "SET_HISTORY",
  SET_YEARS = "SET_YEARS"
}

export enum ProductsActionType {

  SET_CATEGORIES = "Set Categories",

  SET_PRODUCTS = "Set Products",

  SET_PRODUCTS_PAGINATION = "Set Products Page",
  ADD_PRODUCTS_PAGINATION = "Add Products Page",

  ADD_PRODUCT = "[Products] Add Product",
  UPDATE_PRODUCT = "Update Product",
}
