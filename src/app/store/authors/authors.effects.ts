import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, of } from 'rxjs';
import { AuthorsService } from 'src/app/services/authors.service';
import { AuthorsActions } from './authors.actions';


@Injectable({
  providedIn: 'root'
})

export class AuthorsEffects {

  getAuthors$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthorsActions.requestAuthors),
      mergeMap(() => this.authorsService.getAll()
        .pipe(
          map(({result}) => (AuthorsActions.requestAuthorsSuccess({
            authors: result
          }))
          ),
          catchError(error => of(AuthorsActions.requestAuthorsFail({ errorMessage: error })))
        )
      )
    )
  );

  addAuthor$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthorsActions.requestAddAuthor),
      mergeMap(({name}) => this.authorsService.addNewAuthor(name)
        .pipe(
          map(({result}) => (AuthorsActions.requestAddAuthorSuccess({
            addedAuthor: result
          }))
          ),
          catchError(error => of(AuthorsActions.requestAddAuthorFail({ errorMessage: error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authorsService: AuthorsService
  ) {}
}
