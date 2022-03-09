import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course-model.js';
import { CoursesStoreService } from '../../services/courses-store.service';
import { mockedCourseList } from '../../core/constans/modules_module-02_mocks.js';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$ = new BehaviorSubject<Course[]>(mockedCourseList);
  username: string;
  logButtonText: string;
  isConfirmModalOpen: boolean = false;
  isCourseFormOpen: boolean = false;
  isInfo: boolean = false;
  isLogin: boolean = false;
  isRegistration: boolean = false;
  selectedСourse: Course;
  addButtonText: string = 'Add new course';
  infoTitle: string = 'Your list is empty';
  infoText: string = `Please use the button '${this.addButtonText}' to add your first course`;
  modalTitle: string = 'Confirm request please';
  modalMessage: string;

  constructor(
    private coursesStore: CoursesStoreService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getCourses();
    this.coursesStore.getAll().subscribe(item => console.log(item));
  }

  removeCourse(): void {
    const courses = this.courses$.getValue().filter(course => {
      return course.id !== this.selectedСourse.id;
    });
    this.courses$.next(courses);
    if(courses.length === 0) {
      this.isInfo = true;
    }
  }

  openRemoveModal(course: Course): void {
    this.isConfirmModalOpen = true;
    this.selectedСourse = course;
    this.modalMessage = `Do you want to remove ${this.selectedСourse.title} course?`;
  }

  confirmRemoveCourse(data: boolean): void {
    if (data) {
      this.removeCourse();
    }
    this.isConfirmModalOpen = false;
  }

  editCourse(course: Course): void {
    this.setSessionStorage(course.id);
    this.isCourseFormOpen = true;
  }

  showCourse(course: Course): void {}

  addCourse(): void {
    this.isInfo = false;
    this.isCourseFormOpen = true;
  }

  submit(data: Course): void {
    this.isCourseFormOpen = false;
    this.saveCourse(data);
  }

  private saveCourse(data: Course): void {
    const courses = this.courses$.getValue();
    let find = courses.find(item => item.id === data.id);
    if(find) {
      this.courses$.next([
        ...courses.map(item => {
          if(item.id === data.id) {
            return data;
          } else {
            return item;
          }
        })
      ]);
    } else {
      this.courses$.next([
        ...courses,
        {
          ...data,
          id: courses[courses.length+1]+'1'
        }
      ]);
    }
  }

  private setSessionStorage(id: string): void {
    sessionStorage.setItem('id', id);
  }

  private getCourses(): Observable<Course[]> {
    return this.courses$.asObservable();
  }

  private getUser(): void {
    this.username = 'Somebody';
    this.login();
  }

  private login(): void {
    this.logButtonText = 'Logout';
  }

  logOut() {
    this.isLogin = true;
  }

}
