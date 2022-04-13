import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, of, switchMap, tap, zip } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { AuthorsStateFacade } from '../authors/authors.facade';
import { CoursesActions } from './courses.actions';


@Injectable({
  providedIn: 'root'
})

export class CoursesEffects {

  getAll$ = createEffect(() => this.actions$
    .pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() => this.coursesService.getAll()
        .pipe(
          map(({result}) => (CoursesActions.requestAllCoursesSuccess({
            allCourses: result
          }))
          ),
          catchError(error => of(CoursesActions.requestAllCoursesFail({ errorMessage: error })))
        )
      )
    )
  );

  filteredCourses$ = createEffect(() => this.actions$
    .pipe(
      ofType(CoursesActions.requestFilteredCourses),
      mergeMap(({searchValue}) => this.coursesService.filterCourses(searchValue)
        .pipe(
          map(({result}) => (CoursesActions.requestFilteredCoursesSuccess({
            courses: result
          }))
          )
        )
      )
    )
  );

  getSpecificCourse$ = createEffect(() => this.actions$
    .pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap(({id}) => zip([this.coursesService.getCourse(id), this.authorsFacade.authors$])
        .pipe(
          map(([{result}, authors]) => {
            let course = {
              ...result,
              authorsName: result.authors.map(author => authors.find(aut => aut.id === author)?.name ?? author)
            }
            return (CoursesActions.requestSingleCourseSuccess({
              course: course
            }))
          }),
          catchError(error => of(CoursesActions.requestSingleCourseFail({ errorMessage: error })))
        )
      )
    )
  );

  deleteCourse$ = createEffect(() => this.actions$
    .pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap(({id}) => this.coursesService.deleteCourse(id)
        .pipe(
          mergeMap(() => this.coursesService.getAll()
            .pipe(
              map(({result}) => {
                return (CoursesActions.requestAllCoursesSuccess({
                allCourses: result
              }))}
              )
            )
          ),
          catchError(error => of(CoursesActions.requestAllCoursesFail({ errorMessage: error })))
        )
      )
    )
  );

  editCourse$ = createEffect(() => this.actions$
    .pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(({body, id}) => this.coursesService.editCourse(body, id)
        .pipe(
          map(({result}) => (CoursesActions.requestEditCourseSuccess({
            course: result
          }))),
          catchError(error => of(CoursesActions.requestEditCourseFail({ errorMessage: error })))
        )
      )
    )
  );

  createCourse$ = createEffect(() => this.actions$
    .pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap(({body}) => this.coursesService.addCourse(body)
        .pipe(
          map(({result}) => (CoursesActions.requestCreateCourseSuccess({
            course: result
          }))
          ),
          catchError(error => of(CoursesActions.requestCreateCourseFail({ errorMessage: error })))
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        CoursesActions.requestCreateCourseSuccess,
        CoursesActions.requestEditCourseSuccess,
        CoursesActions.requestSingleCourseFail
        ),
      tap(() => this.router.navigate(['/courses']))
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private authorsFacade: AuthorsStateFacade,
    private router: Router
  ) {}
}
