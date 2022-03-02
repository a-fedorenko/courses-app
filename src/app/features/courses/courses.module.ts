import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseFormModule } from '../course-form/course-form.module';
import { LoginModule } from '../login/login.module';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseCardComponent,
    CourseListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CourseFormModule,
    LoginModule,
  ],
  exports: [
    CoursesComponent
  ],
})
export class CoursesModule { }
