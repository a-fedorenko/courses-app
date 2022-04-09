import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorsState } from "./authors.reducer";

export namespace AuthorsSelectors {

  export const state = createFeatureSelector<AuthorsState>("authors");

  export const getAddedAuthor = createSelector(state, (state) => state.addedAuthor);

  export const getAuthors = createSelector(state, (state) => state.authors);

}
