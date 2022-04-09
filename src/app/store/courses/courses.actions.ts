import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/core/models/course-model';

export namespace CoursesActions {
  export const requestAllCourses = createAction(
    "REQUEST_ALL_COURSES"
  );

  export const requestAllCoursesSuccess = createAction(
    "REQUEST_ALL_COURSES_SUCCESS",
    props<{allCourses: Course[]}>()
  );

  export const requestAllCoursesFail = createAction(
    "REQUEST_ALL_COURSES_FAIL",
    props<{errorMessage: any}>()
  );

  export const requestSingleCourse = createAction(
    "REQUEST_SINGLE_COURSE",
    props<{id: string}>()
  );

  export const requestSingleCourseSuccess = createAction(
    "REQUEST_SINGLE_COURSE_SUCCESS",
    props<{course: Course}>()
  );

  export const requestSingleCourseFail = createAction(
    "REQUEST_SINGLE_COURSE_FAIL",
    props<{errorMessage: any}>()
  );

  export const requestFilteredCourses = createAction(
    "REQUEST_FILTERED_COURSES",
    props<{searchValue: string}>()
  );

  export const requestFilteredCoursesSuccess = createAction(
    "REQUEST_FILTERED_COURSES_SUCCESS",
    props<{courses: Course[]}>()
  );

  export const requestDeleteCourse = createAction(
    "REQUEST_DELETE_COURSE",
    props<{id: string}>()
  );

  export const requestDeleteCourseFail = createAction(
    "REQUEST_DELETE_COURSE_FAIL",
    props<{errorMessage: any}>()
  );

  export const requestEditCourse = createAction(
    "REQUEST_EDIT_COURSE",
    props<{body: Course, id: string}>()
  );

  export const requestEditCourseSuccess = createAction(
    "REQUEST_EDIT_COURSE_SUCCESS",
    props<{course: Course}>()
  );

  export const requestEditCourseFail = createAction(
    "REQUEST_EDIT_COURSE_FAIL",
    props<{errorMessage: any}>()
  );

  export const requestCreateCourse = createAction(
    "REQUEST_CREATE_COURSE",
    props<{body: Course}>()
  );

  export const requestCreateCourseSuccess = createAction(
    "REQUEST_CREATE_COURSE_SUCCESS",
    props<{course: Course}>()
  );

  export const requestCreateCourseFail = createAction(
    "REQUEST_CREATE_COURSE_FAIL",
    props<{errorMessage: any}>()
  );

}
