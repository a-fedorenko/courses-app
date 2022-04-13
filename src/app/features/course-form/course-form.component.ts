import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Subject, takeUntil, tap, zip } from 'rxjs';
import { Course } from 'src/app/core/models/course-model';
import { Author } from 'src/app/services/authors.service';
import { AuthorsStateFacade } from 'src/app/store/authors/authors.facade';
import { CoursesStateFacade } from 'src/app/store/courses/courses.facade';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  courseForm: FormGroup;
  selectedCourse: Course | null;
  currentCourseAuthors: string[] = [];
  allAuthors: Author[];
  duration: number;

  public get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  constructor(
    private coursesFacade: CoursesStateFacade,
    private authorsFacade: AuthorsStateFacade,
  ) {
    this.coursesFacade.getAllCourses();
    this.authorsFacade.getAuthors();
  }

  ngOnInit(): void {
    this.getAllAuthors();
    this.getCourse();
    this.duration = this.selectedCourse?.duration ?? 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getCourse(): void {
    this.coursesFacade.course$
      .pipe(
        map((course) => {
          if(course) {
            this.currentCourseAuthors = [...course.authors];
            this.selectedCourse = {
              ...course
            }
          }
          this.initForm();
        }),
        takeUntil(this.destroy$)
      ).subscribe();
  }

  private getAllAuthors() {
    this.authorsFacade.authors$
      .pipe(
        tap(authors => this.allAuthors = authors),
        takeUntil(this.destroy$)
      ).subscribe();
  }

  submit(): void {
    let course = {
      ...this.courseForm.value,
      authors: [...this.currentCourseAuthors]
    }
    if(this.selectedCourse) {
      this.coursesFacade.editCourse(course, course.id);
    } else {
      course = {
        ...course,
        duration: Number(this.courseForm.value.duration)
      }
      this.coursesFacade.createCourse(course);
    }
  }

  addedAuthor(): void {
    this.authorsFacade.addAuthor(this.courseForm.value.newAuthor);
    this.authorsFacade.addedAuthor$
      .pipe(
        tap((author) => {
          if(author) {
            this.currentCourseAuthors.push(author.id);
            this.authors.push(new FormControl(
              {value: this.courseForm.value.newAuthor, disabled: true}
            ));
          }
        })
      ).subscribe()
  }

  removeAuthor(index: number): void {
    this.currentCourseAuthors.splice(index, 1);
    (this.courseForm.get('authors') as FormArray).removeAt(index);
  }

  private getAuthors(): FormControl[]  {
    return this.selectedCourse?.authorsName?.map((author) =>  {
      return new FormControl(
        {value: author, disabled: true},
        [Validators.required]
      )
     }
    ) ?? [];
  }

  private addNewAuthor(): FormControl {
    return new FormControl(null);
  }

  private initForm(): void {
    this.courseForm = new FormGroup({
      id:  new FormControl(this.selectedCourse?.id),
      title: new FormControl(this.selectedCourse?.title, [Validators.required]),
      description: new FormControl(this.selectedCourse?.description, [Validators.required]),
      duration: new FormControl(this.selectedCourse?.duration, [Validators.required, Validators.min(0)]),
      authors: new FormArray(this.getAuthors()),
      newAuthor: this.addNewAuthor(),
    });
  }

}
