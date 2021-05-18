import { createSelector } from "@ngrx/store";


export const userSelecotr = createSelector(
  state => state["auth"],
  (state) => state.user
)

export const isLoggin = createSelector(
  state => state["auth"],
  (state) => !!state.user
)
