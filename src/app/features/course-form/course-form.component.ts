import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Course } from 'src/app/core/models/course-model';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  courseForm: FormGroup;
  courses$ = new BehaviorSubject<Course[]>([{
    id: 'string',
    title: 'string',
    description: 'string',
    creationDate: new Date,
    duration:  120,
    authors: []
  }]);
  selectedCourseId: string | null;
  selectedCourse: Course;
  duration: number;

  @Output() submitCourse: EventEmitter<Course> = new EventEmitter<Course>();

  public get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  constructor() { }

  ngOnInit(): void {
    this.selectedCourseId = sessionStorage.getItem('id');
    this.selectedCourse = this.courses$.getValue()
      .filter(item => item.id === this.selectedCourseId)[0] ?? '';
    this.duration = this.selectedCourse.duration ?? 0;
    this.initForm();
    sessionStorage.clear();
  }

  submit(): void {
    let course = {
      ...this.courseForm.value,
      id: this.courseForm.value.id,
      creationDate: Date.now(),
      authors: this.authors.value
    }
    this.submitCourse.emit(course);
  }

  addAuthor(): void {
    const author = new FormControl(
      {value: this.courseForm.value.newAuthor, disabled: true}
    );
    this.authors.push(author);
  }

  removeAuthor(index: number): void {
    (this.courseForm.get('authors') as FormArray).removeAt(index);
  }

  private getAuthors(): FormControl[]  {
    const course = this.courses$.getValue()
      .filter(item => item.id === this.selectedCourseId);

    return course[0]?.authors.map((author) =>  {
      return new FormControl(
        {value: author, disabled: true}, [Validators.required]
      )
     }
    ) ?? [];
  }

  private addNewAuthor(): FormControl {
    return new FormControl(null);
  }

  private initForm(): void {
    this.courseForm = new FormGroup({
      id:  new FormControl(this.selectedCourse.id),
      title: new FormControl(this.selectedCourse.title, [Validators.required]),
      description: new FormControl(this.selectedCourse.description, [Validators.required]),
      duration: new FormControl(this.selectedCourse.duration, [Validators.required, Validators.min(0)]),
      authors: new FormArray(this.getAuthors()),
      newAuthor: this.addNewAuthor(),
    });
  }

}
