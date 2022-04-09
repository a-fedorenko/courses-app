import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.reducer";

export namespace AuthSelectors {

  export const state = createFeatureSelector<AuthState>("auth");

  export const isUserAuthorized = createSelector(state, (state) => state.isAuthorized);

  export const getToken = createSelector(state, (state) => state.token);

  export const getSpecificErrorMessage = createSelector(state, (state) => state.errorMessage);

}
