import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserActions } from './user.actions';

@Injectable({
  providedIn: 'root'
})

export class UserEffects {

  getCurrentUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.requestCurrentUser),
      mergeMap(() => this.userService.getUser()
        .pipe(
          map(res => (UserActions.requestCurrentUserSuccess({
              name: res.result.name,
              isAdmin: res.result.role === 'admin' ? true : false
            }))
          ),
          catchError(error => of(UserActions.requestCurrentUserFail({error: error})))
        ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
