import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/user/guards/admin.guard';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CourseComponent } from '../course/course.component';
import { CoursesComponent } from './courses.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CoursesComponent,
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: CourseFormComponent
      },
      {
        path: ':id',
        component: CourseComponent
      },
      {
        path: 'edit/:id',
        canActivate: [AdminGuard],
        component: CourseFormComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
