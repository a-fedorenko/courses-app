import { createAction, props } from '@ngrx/store';
import { Author } from 'src/app/services/authors.service';

export namespace AuthorsActions {
  export const requestAuthors = createAction(
    "REQUEST_AUTHORS"
  );

  export const requestAuthorsSuccess = createAction(
    "REQUEST_AUTHORS_SUCCESS",
    props<{authors: Author[]}>()
  );

  export const requestAuthorsFail = createAction(
    "REQUEST_AUTHORS_FAIL",
    props<{errorMessage: any}>()
  );

  export const requestAddAuthor = createAction(
    "REQUEST_ADD_AUTHOR",
    props<{name: string}>()
  );

  export const requestAddAuthorSuccess = createAction(
    "REQUEST_ADD_AUTHOR",
    props<{addedAuthor: Author}>()
  );

  export const requestAddAuthorFail = createAction(
    "REQUEST_ADD_AUTHOR_FAIL",
    props<{errorMessage: any}>()
  );

  export const resetAddedAuthor = createAction(
    "RESET_ADDED_AUTHOR"
  );

}
