import { createSelector } from "@ngrx/store";


export const cartSelecotr = createSelector(
  state => state["cart"],
  (state) => state.cart
)
