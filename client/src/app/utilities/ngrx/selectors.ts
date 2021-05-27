import { createSelector } from "@ngrx/store";


// AUTH SELECTORS
export const userSelecotr = createSelector(
  state => state["auth"],
  (state) => state.user
)

export const isLoggin = createSelector(
  state => state["auth"],
  (state) => !!state.user
)

// CART SELECTORS
export const cartSelecotr = createSelector(
  state => state["cart"],
  (state) => state.cart
)

// ORDER SELECTORS

export const hisotrySelecotr = createSelector(
  state => state["order"],
  (state) => state.history
)

export const orderSelecotr = createSelector(
  state => state["order"],
  (state) => state.currentOrder
)

export const yearsSelecotr = createSelector(
  state => state["order"],
  (state) => state.years
)
