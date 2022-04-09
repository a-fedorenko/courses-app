import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AuthActions } from './auth.actions';


@Injectable({
  providedIn: 'root'
})

export class AuthEffects {

  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.requestLogin),
      mergeMap((user) => this.authService.login(user)
        .pipe(
          map(res => (AuthActions.requestLoginSuccess({
            isAuthorized: true,
            token: res.result.split(' ')[1]
          }))
          ),
          catchError(error => of(AuthActions.requestLoginFail({ errorMessage: error })))
        )
      )
    )
  );

  register$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.requestRegister),
      mergeMap((user) => this.authService.register(user)
        .pipe(
          map(() => (AuthActions.requestRegisterSuccess())
          ),
          catchError(error => of(AuthActions.requestLoginFail({ errorMessage: error })))
        )
      )
    )
  );

  logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.requestLogout),
      mergeMap(() => this.authService.logout()
        .pipe(
          map(() => (AuthActions.requestLogoutSuccess({
            token: null,
            isAuthorized: false
          }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
