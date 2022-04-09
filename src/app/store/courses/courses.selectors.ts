import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";

export namespace CoursesSelectors {

  export const state = createFeatureSelector<CoursesState>("courses");

  export const isAllCoursesLoadingSelector = createSelector(state, (state) => state.isAllCoursesLoading);

  export const isSearchingStateSelector = createSelector(state, (state) => state.isSearchState);

  export const isSingleCourseLoadingSelector = createSelector(state, (state) => state.isSingleCourseLoading);

  export const getCourses = createSelector(state, (state) => state.courses);

  export const getAllCourses = createSelector(state, (state) => state.allCourses);

  export const getCourse = createSelector(state, (state) => state.course);

  export const getErrorMessage = createSelector(state, (state) => state.errorMessage);

}
