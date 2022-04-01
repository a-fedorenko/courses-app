import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, pluck, tap } from 'rxjs';
import { Course } from '../core/models/course-model';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
  private course$$: BehaviorSubject<Course | null> = new BehaviorSubject<Course | null>(null);

  get isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }

  get courses$(): Observable<Course[]> {
    return this.courses$$.asObservable();
  }

  get course$(): Observable<Course | null> {
    return this.course$$.asObservable();
  }

  constructor(
    private coursesService: CoursesService,
  ) { }

  getAll(): Observable<Course[]> {
    return this.coursesService.getAll()
      .pipe(
        pluck('result'),
        tap((result) => {
          this.courses$$.next(result ?? []);
        })
      );
  }

  filterCourse(title: string): Observable<Course[]> {
    return this.coursesService.filterCourse(title)
      .pipe(
        pluck('result')
      )
  }

  addCourse(course: Course): Observable<{
    successful: boolean,
    result: Course
  }> {
    return this.coursesService.addCourse(course);
  }

  getCourse(id: string): Observable<{
    successful: boolean,
    result?: Course
  }> {
    return this.coursesService.getCourse(id)
      .pipe(
        tap(res => {
          this.course$$.next(res.result);
        })
      )
  }

  editCourse(course: Course): Observable<{
    successful: boolean,
    result: Course
  }> {
    return this.coursesService.editCourse(course);
  }

  deleteCourse(id: string): Observable<{
    successful: boolean,
    result: string
  }>{
    return this.coursesService.deleteCourse(id);
  }
}
