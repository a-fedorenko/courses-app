import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../core/models/course-model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  configUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<{
    successful: boolean,
    result?: Course[]
  }> {
    return this.http.get<{
      successful: boolean,
      result?: Course[]
    }>(`${this.configUrl}/courses/all`);
  }

  createCourse(course: Course) {
    return this.http.post(`${this.configUrl}/courses/add`, course);
  }

  editCourse(course: Course) {
    return this.http.put(`${this.configUrl}/courses/${course.id}`, course);
  }

  getCourse(id: string): Observable<{
    successful: boolean,
    result: Course
  }> {
    return this.http.get<{
      successful: boolean,
      result: Course
    }>(`${this.configUrl}/courses/${id}`);
  }

  deleteCourse(id: string) {
    this.http.delete(`${this.configUrl}/courses/${id}`);
  }
}
