import {  Action, createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  isAdmin: boolean,
  name: string | null
};

const initialState: UserState = {
  isAdmin: false,
  name: null
};

export const userReducer = (state: UserState, action: Action): UserState => reducer(state, action);

export const reducer = createReducer(
  initialState,
  on(UserActions.requestCurrentUser, (state) => ({
    ...state,
    isLoading: true
  })),
  on(UserActions.requestCurrentUserSuccess, (state, {isAdmin, name}) => ({
    ...state,
    isAdmin,
    name,
    isLoading: false
  })),
  on(UserActions.requestCurrentUserFail, (state, {error}) => ({
    ...state,
    error,
    isLoading: false
  })),

);
