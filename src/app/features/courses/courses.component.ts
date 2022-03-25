import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course-model.js';
import { CoursesStoreService } from '../../services/courses-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses: Course[];
  username: string;
  logButtonText: string;
  isConfirmModalOpen: boolean = false;
  isCourseFormOpen: boolean = false;
  isInfo: boolean = false;
  selectedСourse: Course;
  addButtonText: string = 'Add new course';
  infoTitle: string = 'Your list is empty';
  infoText: string = `Please use the button '${this.addButtonText}' to add your first course`;
  modalTitle: string = 'Confirm request please';
  modalMessage: string;

  constructor(
    private coursesStore: CoursesStoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    //this.courses$ = this.coursesStore.courses$;
    this.coursesStore.courses$.subscribe(courses => {
      this.courses = courses;
    })
  }

  ngOnDestroy(): void {

  }

  private removeCourse(): void {
    this.coursesStore.deleteCourse(this.selectedСourse.id);
    console.log(this.courses.length);

    if(this.courses.length === 0) {
      console.log('hi');

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
    this.coursesStore.createCourse(data);
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
  }

  private setSessionStorage(id: string): void {
    sessionStorage.setItem('id', id);
  }

  private getUser(): void {
    this.username = 'Somebody';
    this.login();
  }

  private login(): void {
    this.logButtonText = 'Logout';
  }

  toLogin(): void {
    this.router.navigate(['login']);
  }

}
