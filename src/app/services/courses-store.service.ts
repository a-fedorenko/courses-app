import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../core/models/course-model';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private courses$$: BehaviorSubject<Observable<Course[]>>;

  constructor(
    private coursesService: CoursesService
  ) { }

  getAll() {
    return this.coursesService.getAll();
  }

  createCourse() {

  }

  editCourse() {

  }

  getCourse() {

  }

  deleteCourse() {

  }

  isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }

  courses$() {
    this.isLoading$$.next(true);
    // this.courses$$.next(this.getAll())
    return this.courses$$.asObservable();
  }
}
