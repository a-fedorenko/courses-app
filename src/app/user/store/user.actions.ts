import { createAction, props } from '@ngrx/store';

export namespace UserActions {
  export const requestCurrentUser = createAction(
    "CURRENT_USER"
  );

  export const requestCurrentUserSuccess = createAction(
    "CURRENT_USER_SUCCESS",
    props<{isAdmin: boolean, name: string | null}>()
  );

  export const requestCurrentUserFail = createAction(
    "CURRENT_USER_FAIL",
    props<{error: any}>()
  );
}
