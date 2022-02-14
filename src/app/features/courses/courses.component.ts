import { Component, OnInit } from '@angular/core';
import { mockedCourseList } from '../../../../modules_module-02_mocks.js';


export interface Course {
  id: string,
  title: string,
  description: string,
  creationDate: Date,
  duration:  number,
  authors: string[]
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  username: string;
  courses: Course[];
  logButtonText: string;
  isConfirmModalOpen: boolean = false;
  selectedСourse: Course;
  addButtonText: string = 'Add new course';
  infoTitle: string = 'Your list is empty';
  infoText: string = `Please use the button '${this.addButtonText}' to add your first course`;
  modalTitle: string = 'Confirm request please';
  modalMessage: string;

  constructor() { }

  ngOnInit(): void {
    this.getUser();
    this.getCourses();
  }

  removeCourse(): void {
    this.courses = this.courses.filter(item => item.id !== this.selectedСourse.id);
  }

  openRemoveModal(course: Course): void {
    this.isConfirmModalOpen = true;
    this.selectedСourse = course;
    this.modalMessage = `Do you want to remove ${this.selectedСourse.title} course?`;
  }

  confirmRemoveCourse(data: boolean): void {
    if (data) {
      this.removeCourse();
    }
    this.isConfirmModalOpen = false;
  }

  editCourse(course: Course): void {}

  showCourse(course: Course): void {}

  private getCourses(): void {
    this.courses = mockedCourseList.map(item => Object.assign({}, item));
  }

  private getUser(): void {
    this.username = 'Somebody';
    this.login();
  }

  private login(): void {
    this.logButtonText = 'Logout';
  }

}
