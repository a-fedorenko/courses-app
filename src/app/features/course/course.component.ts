import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { Course } from 'src/app/core/models/course-model';
import { CoursesStoreService } from 'src/app/services/courses-store.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  selectedCourse: Course | null;

  constructor(
    private coursesStore: CoursesStoreService,
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getCourse (): void {
    this.coursesStore.course$
      .pipe(
        tap(course => {
          this.selectedCourse = course
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

}
