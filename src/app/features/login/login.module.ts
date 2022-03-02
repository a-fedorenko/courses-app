import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationModule } from '../registration/registration.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegistrationModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
  ],
})
export class LoginModule { }
