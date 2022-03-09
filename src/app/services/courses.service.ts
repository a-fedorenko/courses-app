import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../core/models/course-model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  configUrl = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'text/javascript',
    }), responseType: 'text' as 'json'
  };

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.configUrl}/api/#/courses/all`, this.httpOptions);
  }

  createCourse(course: Course) {
    return this.http.post('http://localhost:3000/api/courses/add', course);
  }

  editCourse(course: Course) {
    return this.http.put(`http://localhost:3000/api/courses/${course.id}`, course);
  }

  getCourse(id: string) {
    return this.http.get<Course>(`http://localhost:3000/api/courses/${id}`);
  }

  deleteCourse(id: string) {
    return this.http.delete(`http://localhost:3000/api/relations/${id}`);
  }
}
