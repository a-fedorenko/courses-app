import {  Action, createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';


export const authFeatureKey = 'auth';

export interface AuthState {
  isAuthorized: boolean,
  token: string | null,
  errorMessage: string | null,
};

const initialState: AuthState = {
  isAuthorized: false,
  token: null,
  errorMessage: null
};

export const authReducer = (state: AuthState, action: Action): AuthState => reducer(state, action);

export const reducer = createReducer(
  initialState,
  on(AuthActions.requestLogin, (state) => ({
    ...state
  })),
  on(AuthActions.requestLoginSuccess, (state, {isAuthorized, token}) => ({
    ...state,
    isAuthorized,
    token
  })),
  on(AuthActions.requestLoginFail, (state, {errorMessage}) => ({
    ...state,
    errorMessage
  })),
  on(AuthActions.requestRegister, (state) => ({
    ...state
  })),
  on(AuthActions.requestRegisterSuccess, (state) => ({
    ...state
  })),
  on(AuthActions.requestRegisterFail, (state, {errorMessage}) => ({
    ...state,
    errorMessage
  })),
  on(AuthActions.requestLogout, (state) => ({
    ...state
  })),
  on(AuthActions.requestLogoutSuccess, (state, {isAuthorized}) => ({
    ...state,
    token: null,
    isAuthorized
  })),
);
