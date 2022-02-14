import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent, ButtonComponent, InfoComponent, ModalComponent } from './components/index';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MyTimePipe } from './pipes/my-time.pipe';


const COMPONENTS: any[] = [HeaderComponent, ButtonComponent, InfoComponent, ModalComponent];
const PIPES: any[] = [MyTimePipe];


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
  ],
})
export class SharedModule { }
