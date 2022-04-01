import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { Course } from 'src/app/core/models/course-model';
import { AuthorsStoreService } from 'src/app/services/authors-store.service';
import { Author } from 'src/app/services/authors.service';
import { CoursesStoreService } from 'src/app/services/courses-store.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  courseForm: FormGroup;
  allCourses: Course[];
  allAuthors: Author[];
  currentCourseAuthors: string[];
  selectedCourse: Course | null;
  duration: number;

  public get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  constructor(
    private coursesStore: CoursesStoreService,
    private authorsStore: AuthorsStoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllAuthors();
    this.getCourse();
    this.getAllCourses();
    this.duration = this.selectedCourse?.duration ?? 0;
    this.currentCourseAuthors = this.selectedCourse?.authors ?? [];
    this.initForm();
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

  private getAllAuthors(): void {
    this.authorsStore.authors$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        authors => this.allAuthors = authors
      );
  }

  private getAllCourses(): void {
    this.coursesStore.courses$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        courses => this.allCourses = courses
      );
  }

  submit(): void {
    let course = {
      ...this.courseForm.value,
      authors: [...this.currentCourseAuthors]
    }
    let find = this.allCourses.find(item => item.id === course.id);
    if(find) {
      this.coursesStore.editCourse(course)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.router.navigate(['/courses']);
          }
      );
    } else {
      course = {
        ...course,
        duration: Number(this.courseForm.value.duration)
      }
      this.coursesStore.addCourse(course)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.router.navigate(['/courses']);
          }
      );
    }

  }

  addAuthor(): void {
    const author = new FormControl(
      {value: this.courseForm.value.newAuthor, disabled: true}
    );
    this.authorsStore.addAuthor(author.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        aut => this.currentCourseAuthors.push(aut.id)
      );
    this.authors.push(author);
  }

  removeAuthor(index: number): void {
    this.currentCourseAuthors.splice(index, 1);
    (this.courseForm.get('authors') as FormArray).removeAt(index);
  }

  private getAuthors(): FormControl[]  {
    return this.currentCourseAuthors.map((author) =>  {
      return new FormControl(
        {
          value: this.allAuthors.find(item => item.id === author)?.name, disabled: true
        },
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
