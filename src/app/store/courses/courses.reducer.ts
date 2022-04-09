import {  Action, createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/core/models/course-model';
import { CoursesActions } from './courses.actions';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  allCourses: Course[] | [],
  courses: Course[] | null,
  course: Course | null,
  isAllCoursesLoading: boolean,
  isSingleCourseLoading: boolean,
  isSearchState: boolean,
  errorMessage: string | null
};

const initialState: CoursesState = {
  allCourses: [],
  courses: null,
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null
};

export const userReducer = (state: CoursesState, action: Action): CoursesState => reducer(state, action);

export const reducer = createReducer(
  initialState,
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, {allCourses}) => ({
    ...state,
    allCourses,
    isAllCoursesLoading: false
  })),
  on(CoursesActions.requestAllCoursesFail, (state, {errorMessage}) => ({
    ...state,
    errorMessage,
    isAllCoursesLoading: false
  })),
  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, {course}) => ({
    ...state,
    course,
    isSingleCourseLoading: false,
  })),
  on(CoursesActions.requestSingleCourseFail, (state, {errorMessage}) => ({
    ...state,
    errorMessage,
    isSingleCourseLoading: false,
  })),
  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, {courses}) => ({
    ...state,
    courses,
    isSearchState: true
  })),
  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, {errorMessage}) => ({
    ...state,
    errorMessage
  })),
  on(CoursesActions.requestEditCourse, (state) => ({
    ...state
  })),
  on(CoursesActions.requestEditCourseSuccess, (state, {course}) => ({
    ...state,
    allCourses: [...state.allCourses, course],
  })),
  on(CoursesActions.requestEditCourseFail, (state, {errorMessage}) => ({
    ...state,
    errorMessage
  })),
  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state, {course}) => ({
    ...state,
    allCourses: [...state.allCourses, course],
  })),
  on(CoursesActions.requestCreateCourseFail, (state, {errorMessage}) => ({
    ...state,
    errorMessage
  })),
);
