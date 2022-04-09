import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CoursesRoutingModule } from '../courses/courses-routing.module';



@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CoursesRoutingModule,
    SharedModule
  ]
})
export class CourseModule { }
