import {  Action, createReducer, on } from '@ngrx/store';
import { Author } from 'src/app/services/authors.service';
import { AuthorsActions } from './authors.actions';

export const authorsFeatureKey = 'authors';

export interface AuthorsState {
  authors: Author[] | [],
  addedAuthor: Author | null
};

const initialState: AuthorsState = {
  authors: [],
  addedAuthor: null
};

export const userReducer = (state: AuthorsState, action: Action): AuthorsState => reducer(state, action);

export const reducer = createReducer(
  initialState,
  on(AuthorsActions.requestAuthors, (state) => ({
    ...state,
    isLoading: true
  })),
  on(AuthorsActions.requestAuthorsSuccess, (state, {authors}) => ({
    ...state,
    authors,
    isLoading: false
  })),
  on(AuthorsActions.requestAuthorsFail, (state, {errorMessage}) => ({
    ...state,
    error: errorMessage,
    isLoading: false
  })),
  on(AuthorsActions.requestAddAuthor, (state) => ({
    ...state
  })),
  on(AuthorsActions.requestAddAuthorSuccess, (state, {addedAuthor}) => ({
    ...state,
    addedAuthor
  })),
  on(AuthorsActions.requestAddAuthorFail, (state, {errorMessage}) => ({
    ...state,
    error: errorMessage
  })),
  on(AuthorsActions.resetAddedAuthor, (state) => ({
    ...state
  })),
);
