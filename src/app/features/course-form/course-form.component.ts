import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, map, Subject, takeUntil, tap, zip } from 'rxjs';
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
  currentCourseAuthors: string[] = [];
  selectedCourse: Course | null;
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
    this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getCourse (): void {
    zip([this.coursesFacade.course$, this.authorsFacade.authors$])
      .pipe(
        map(([course, authors]) => {
          if(course) {
            this.currentCourseAuthors = course.authors;
            this.selectedCourse = {
              ...course,
              authors: course.authors.map(author => authors.find(aut => aut.id === author)?.name ?? author)
            }
          }
        }),

      ).subscribe()
  }

  private getAllAuthors() {
    this.authorsFacade.authors$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (authors) => this.allAuthors = authors
      )
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
    const author = new FormControl(
      {value: this.courseForm.value.newAuthor, disabled: true}
    );
    this.authorsFacade.addAuthor(this.courseForm.value.newAuthor);
    this.authorsFacade.addedAuthor$
      .pipe(
        tap((author) => {
          if(author) {
            //this.currentCourseAuthors.push(author.id);
            this.selectedCourse?.authors.push(author.name);
          }
        })
      ).subscribe()
    // this.authorsStore.addAuthor(author.value)
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(
    //     aut => this.currentCourseAuthors.push(aut.id)
    //   );
    this.authors.push(author);
  }

  removeAuthor(index: number): void {
    this.selectedCourse?.authors.splice(index, 1);
    (this.courseForm.get('authors') as FormArray).removeAt(index);
  }

  private getAuthors(): FormControl[]  {
    return this.selectedCourse?.authors.map((author) =>  {
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
