import { createSelector } from "@ngrx/store";


// auth selectors
export const userSelecotr = createSelector(
  state => state["auth"],
  (state) => state.user
  )

  export const isLoggin = createSelector(
    state => state["auth"],
    (state) => !!state.user
    )

    // cart selectors
export const cartSelecotr = createSelector(
  state => state["cart"],
  (state) => state.cart
)
