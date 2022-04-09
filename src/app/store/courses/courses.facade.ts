import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Course } from "src/app/core/models/course-model";
import { CoursesActions } from "./courses.actions";
import { CoursesState } from "./courses.reducer";
import { CoursesSelectors } from "./courses.selectors";

@Injectable({
  providedIn: 'root'
})

export class  CoursesStateFacade {

  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector));
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector));
  isSearchingState$: Observable<boolean> = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector));
  courses$: Observable<Course[] | null> = this.store.pipe(select(CoursesSelectors.getCourses));
  allCourses$: Observable<Course[] | []> = this.store.pipe(select(CoursesSelectors.getAllCourses));
  course$: Observable<Course | null> = this.store.pipe(select(CoursesSelectors.getCourse));
  errorMessage$: Observable<string | null> = this.store.pipe(select(CoursesSelectors.getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({id}));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(CoursesActions.requestFilteredCourses({searchValue}));
  }

  editCourse(body: Course, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ body, id }));
  }

  createCourse(body: Course): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }

}
