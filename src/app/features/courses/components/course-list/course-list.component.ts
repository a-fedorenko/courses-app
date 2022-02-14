import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Course } from '../../courses.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  iconEdit: unknown = faPen;
  iconDelete: unknown = faTrashAlt;
  showButtonText: string = 'Show course';

  @Input() courses: Course[];
  @Input() isEdit: boolean = true;

  @Output() edit: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() delete: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() show: EventEmitter<Course> = new EventEmitter<Course>();


  constructor() { }

  ngOnInit(): void {
  }

  showCourse(data: Course): void {
    this.show.emit(data);
  }

  editCourse(data: Course): void {
    this.edit.emit(data);
  }

  deleteCourse(data: Course): void {
    this.delete.emit(data);
  }

}
