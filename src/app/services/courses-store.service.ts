import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from '../core/models/course-model';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);

  get isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }

  get courses$(): Observable<Course[]> {
    this.getAll();
    return this.courses$$.asObservable();
  }

  constructor(
    private coursesService: CoursesService
  ) { }

  getAll(): void {
    this.coursesService.getAll().subscribe(courses => {
      this.courses$$.next(courses.result ?? []);
    });
  }

  createCourse(course: Course): void {
    this.coursesService.createCourse(course);
    // const courses = this.courses$.getValue();
    // let find = courses.find(item => item.id === data.id);
    // if(find) {
    //   this.courses$.next([
    //     ...courses.map(item => {
    //       if(item.id === data.id) {
    //         return data;
    //       } else {
    //         return item;
    //       }
    //     })
    //   ]);
    // } else {
    //   this.courses$.next([
    //     ...courses,
    //     {
    //       ...data,
    //       id: courses[courses.length+1]+'1'
    //     }
    //   ]);
    // }

    // const puppies = [...this.getPuppies(), puppy];
    // this._setPuppies(puppies);
    // this.coursesService.createCourse(course).subscribe(courses => {
    //   console.log(courses);
    // });
  }

  editCourse() {

  }

  getCourse() {
  }

  deleteCourse(id: string) {
    this.coursesService.deleteCourse(id);
  }
}
