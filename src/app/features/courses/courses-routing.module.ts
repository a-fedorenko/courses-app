import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from 'src/app/auth/guards/authorized.guard';
import { CourseFormComponent } from '../course-form/course-form.component';
import { CoursesComponent } from './courses.component';


const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {path: 'add', component: CourseFormComponent},
      {path: ':id', component: CourseFormComponent},
      {path: 'edit/:id', component: CourseFormComponent}
    ],
    canLoad: [AuthorizedGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
