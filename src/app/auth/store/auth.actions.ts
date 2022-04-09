import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/user-model';

export namespace AuthActions {
  export const requestLogin = createAction(
    "REQUEST_LOGIN",
    props<User>()
  );

  export const requestLoginSuccess = createAction(
    "REQUEST_LOGIN_SUCCESS",
    props<{isAuthorized: boolean, token: string}>()
  );

  export const requestLoginFail = createAction(
    "REQUEST_LOGIN_FAIL",
    props<{errorMessage: any}>()
  );

  export const requestRegister = createAction(
    "REQUEST_REGISTER",
    props<User>()
  );

  export const requestRegisterSuccess = createAction(
    "REQUEST_REGISTER_SUCCESS"
  );

  export const requestRegisterFail = createAction(
    "REQUEST_REGISTER_FAIL",
    props<{errorMessage: any}>()
  );

  export const requestLogout = createAction(
    "REQUEST_LOGOUT"
  );

  export const requestLogoutSuccess = createAction(
    "REQUEST_LOGOUT_SUCCESS",
    props<{isAuthorized: boolean, token: null}>()
  );
}
