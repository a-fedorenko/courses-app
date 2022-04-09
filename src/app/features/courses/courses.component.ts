import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Observable, Subject, takeUntil, zip } from 'rxjs';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { Course } from 'src/app/core/models/course-model.js';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { UserStateFacade } from 'src/app/user/store/user.facade';
import { CoursesStoreService } from '../../services/courses-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  username$: Observable<string | null>;
  isAdmin$: Observable<boolean | null>;
  allCourses$: Observable<Course[] | null>;
  isConfirmModalOpen: boolean = false;
  isInfo: boolean = false;
  selectedСourse: Course;
  modalMessage: string;

  constructor(
    private coursesStore: CoursesStoreService,
    private router: Router,
    private userFacade: UserStateFacade,
    private authFacade: AuthStateFacade,
    private authorsFacade: AuthorsStateFacade,
    private coursesFacade: CoursesStateFacade
  ) {
    this.userFacade.getCurrentUser();
    this.authorsFacade.getAuthors();
    this.coursesFacade.getAllCourses();
  }

  ngOnInit(): void {
    this.getUser();
    this.getCourses();
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
    this.coursesFacade.getSingleCourse(course.id);
    setTimeout(() => {
      this.router.navigate(['/courses/edit/:id']);
    }, 10);
  }

  showCourse(course: Course): void {
    this.coursesFacade.getSingleCourse(course.id);
    this.router.navigate(['/courses/:id']);
  }

  addCourse(): void {
    this.isInfo = false;
    this.router.navigate(['/courses/edit/:id']);
  }

  private getUser(): void {
    this.username$ = this.userFacade.name$;
    this.isAdmin$ = this.userFacade.isAdmin$;
  }

  private getCourses(): void {
    this.allCourses$ = zip([this.coursesFacade.allCourses$, this.authorsFacade.authors$])
      .pipe(
        map(([courses, authors]) => courses.map(course => {
            return {
              ...course,
              authors: course.authors.map(author => authors.find(aut => aut.id === author)?.name ?? author)
            }
          })
        )
      )

      // .subscribe(
      //   courses => {
      //     this.courses = courses ?? [];
      //     if(this.courses.length === 0) {
      //       this.isInfo = true;
      //     }
      //   }
      // );
  }

  logout(): void {
    this.authFacade.logout();
  }

  filter(data: string): void {
    this.coursesStore.filterCourse(data)
      // .pipe(takeUntil(this.destroy$))
      // .subscribe(
      //   courses => this.courses = courses ?? []
      // );
  }

}
