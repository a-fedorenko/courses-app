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
    result: Course[]
  }> {
    return this.http.get<{
      successful: boolean,
      result: Course[]
    }>(`${this.configUrl}/courses/all`);
  }

  filterCourse(title: string): Observable<{
    successful: boolean,
    result: Course[]
  }> {
    return this.http.get<{
      successful: boolean,
      result: Course[]
    }>(`${this.configUrl}/courses/filter?title=${title}`);
  }

  addCourse(course: Course): Observable<{
    successful: boolean,
    result: Course
  }> {
    return this.http.post<{
      successful: boolean,
      result: Course
    }>(`${this.configUrl}/courses/add`, {
      title: course.title,
      description: course.description,
      duration: course.duration,
      authors: course.authors,
    });
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

  editCourse(course: Course): Observable<{
    successful: boolean,
    result: Course
  }> {
    return this.http.put<{
      successful: boolean,
      result: Course
    }>(`${this.configUrl}/courses/${course.id}`, {
      title: course.title,
      description: course.description,
      duration: course.duration,
      authors: course.authors,
    });
  }

  deleteCourse(id: string): Observable<{
    successful: boolean,
    result: string
  }> {
    return this.http.delete<{
      successful: boolean,
      result: string
    }>(`${this.configUrl}/courses/${id}`);
  }
}
