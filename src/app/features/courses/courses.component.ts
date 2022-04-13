import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';
import { Course } from 'src/app/core/models/course-model.js';
import { Author } from 'src/app/services/authors.service';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';
import { UserStateFacade } from 'src/app/user/store/user.facade';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  username$: Observable<string | null>;
  isAdmin$: Observable<boolean | null>;
  allCourses: Course[];
  allAuthors: Author[] = [];
  isConfirmModalOpen: boolean = false;
  isInfo: boolean;
  selectedСourse: Course;
  modalMessage: string;

  constructor(
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
    this.coursesFacade.deleteCourse(this.selectedСourse.id);
    this.getCourses();
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
    this.router.navigate(['/courses/edit/:id']);
  }

  showCourse(course: Course): void {
    this.coursesFacade.getSingleCourse(course.id);
    this.router.navigate(['/courses/:id']);
  }

  addCourse(): void {
    this.isInfo = false;
  }

  private getUser(): void {
    this.username$ = this.userFacade.name$;
    this.isAdmin$ = this.userFacade.isAdmin$;
  }

  private getCourses(): void {
    combineLatest([this.coursesFacade.allCourses$, this.authorsFacade.authors$])
      .pipe(
        map(([courses, authors]) => {
          return courses.map(course => {
            return {
              ...course,
              authors: course.authors.map(author => authors.find(aut => aut.id === author)?.name ?? author)
            }
          })}
        ),
        takeUntil(this.destroy$)
      ).subscribe(
        courses => {
          if(courses.length === 0) {
            this.isInfo = true
          }
          this.allCourses = courses;
        }
      );
  }

  logout(): void {
    this.authFacade.logout();
  }

}
