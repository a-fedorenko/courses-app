import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/core/models/course-model.js';
import { UserStoreService } from 'src/app/user/services/user-store.service';
import { UserService } from 'src/app/user/services/user.service';
import { CoursesStoreService } from '../../services/courses-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  courses$: Observable<Course[]>;
  username$: Observable<string | null>;
  username: string | null;
  isConfirmModalOpen: boolean = false;
  isInfo: boolean = false;
  selectedСourse: Course;
  modalMessage: string;

  constructor(
    private coursesStore: CoursesStoreService,
    private auth: AuthService,
    private userService: UserService,
    private userStore: UserStoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getCourses();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private removeCourse() {
    this.coursesStore.deleteCourse(this.selectedСourse.id);
  }

  openRemoveModal(course: Course): void {
    this.isConfirmModalOpen = true;
    this.selectedСourse = course;
    this.modalMessage = `Do you want to remove ${this.selectedСourse.title} course?`;
  }

  confirmRemoveCourse(data: boolean) {
    if (data) {
      this.removeCourse();
    }
    this.isConfirmModalOpen = false;
  }

  editCourse(course: Course): void {
    this.coursesStore.getCourse(course.id);
  }

  showCourse(course: Course): void {}

  addCourse(): void {
    this.isInfo = false;
  }

  submit(data: Course): void {
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

  private getCourses(): void {
    this.coursesStore.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.courses$ = this.coursesStore.courses$;
  }


  private getUser(): void {
    this.userService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.username$ = this.userStore.name$;
  }

  logout(): void {
    this.auth.logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

}
