import { createSelector } from "@ngrx/store";


// AUTH SELECTORS
export const userSelector = createSelector(
  state => state["auth"],
  (state) => state.user
)

export const isLogged = createSelector(
  state => state["auth"],
  (state) => !!state.user
)

// CART SELECTORS
export const cartSelector = createSelector(
  state => state["cart"],
  (state) => state.cart
)

// ORDER SELECTORS

export const historySelector = createSelector(
  state => state["order"],
  (state) => state.history
)

export const orderSelector = createSelector(
  state => state["order"],
  (state) => state.currentOrder
)

export const yearsSelector = createSelector(
  state => state["order"],
  (state) => state.years
)

export const categoriesSelector = createSelector(
  state => state["products"],
  (state) => state.categories
)
