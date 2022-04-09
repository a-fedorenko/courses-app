import { ActionReducerMap } from '@ngrx/store';
import { UserEffects } from '../user/store/user.effects';
import * as fromUser from '../user/store/user.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromAuthors from './authors/authors.reducer';
import * as fromCourses from './courses/courses.reducer';
import { AuthEffects } from '../auth/store/auth.effects';
import { AuthorsEffects } from './authors/authors.effects';
import { CoursesEffects } from './courses/courses.effects';

export interface State {
  [fromUser.userFeatureKey]: fromUser.UserState,
  [fromAuth.authFeatureKey]: fromAuth.AuthState,
  [fromAuthors.authorsFeatureKey]: fromAuthors.AuthorsState,
  [fromCourses.coursesFeatureKey]: fromCourses.CoursesState
}

export const reducers: ActionReducerMap<State> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
  [fromAuth.authFeatureKey]: fromAuth.reducer,
  [fromAuthors.authorsFeatureKey]: fromAuthors.reducer,
  [fromCourses.coursesFeatureKey]: fromCourses.reducer
};

export const effects = [
  UserEffects,
  AuthEffects,
  AuthorsEffects,
  CoursesEffects
];
