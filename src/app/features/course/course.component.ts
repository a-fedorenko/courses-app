import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/core/models/course-model';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  selectedCourse$: Observable<Course | null>;

  constructor(
    private coursesFacade: CoursesStateFacade
  ) { }

  ngOnInit(): void {
    this.getCourse();
  }

  private getCourse (): void {
    this.selectedCourse$ = this.coursesFacade.course$;
  }

}
