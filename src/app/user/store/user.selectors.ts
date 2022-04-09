import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducer"

export namespace UserSelectors {

  export const state = createFeatureSelector<UserState>("user");

  export const getName = createSelector(state, (state) => state.name);

  export const isAdmin = createSelector(state, (state) => state.isAdmin);

}
