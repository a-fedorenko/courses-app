import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, filter, map, mergeMap, Observable, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Course } from 'src/app/core/models/course-model.js';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { Author } from 'src/app/services/authors.service';
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
  username$: Observable<string | null>;
  courses: Course[];
  authors: Author[];
  isConfirmModalOpen: boolean = false;
  isInfo: boolean = false;
  isAdmin: boolean = false;
  selectedСourse: Course;
  modalMessage: string;

  constructor(
    private coursesStore: CoursesStoreService,
    private auth: AuthService,
    private userService: UserService,
    private userStore: UserStoreService,
    private router: Router,
    private authorsStore: AuthorsStoreService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getAuthors();
    this.getCourses();
    this.username$ = this.userStore.name$;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private removeCourse() {
    this.coursesStore.deleteCourse(this.selectedСourse.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.getCourses();
        }
      );
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

  openEditForm(course: Course): void {
    this.coursesStore.getCourse(course.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.router.navigate(['/courses/edit/:id']);
        }
      );
  }

  showCourse(course: Course): void {
    this.coursesStore.getCourse(course.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.router.navigate(['/courses/:id']);
        }
      );
  }

  addCourse(): void {
    this.isInfo = false;
    this.router.navigate(['/courses/edit/:id']);
  }

  private getCourses(): void {
    this.coursesStore.getAll()
      .pipe(
        map((result) => {
          return result?.map(course => {
            return {
              ...course,
              authors: course.authors.map(author => this.authors.find(aut => aut.id === author)?.name ?? author)
            }
          });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(
        courses => {
          this.courses = courses ?? [];
          if(this.courses.length === 0) {
            this.isInfo = true;
          }
        }
      );
  }

  private getAuthors(): void {
    this.authorsStore.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        authors => this.authors = authors
      );
  }

  private getUser(): void {
    this.userService.getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        user => {
          if(user.result.role === 'admin') {
            this.isAdmin = true;
          }
        }
      );
  }

  logout(): void {
    this.auth.logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  filter(data: string): void {
    this.coursesStore.filterCourse(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        courses => this.courses = courses ?? []
      );
  }

}
