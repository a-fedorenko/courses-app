import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  SearchComponent,
} from './components/index';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DurationPipe } from './pipes/duration.pipe';
import { CreationDatePipe } from './pipes/creation-date.pipe';
import { StringJoinerPipe } from './pipes/string-joiner.pipe';
import { EmailValidatorDirective } from './validators/email-validator.directive';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';


const COMPONENTS: any[] = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  ModalComponent,
  SearchComponent,
];
const PIPES: any[] = [
  DurationPipe,
  CreationDatePipe,
  StringJoinerPipe,
  SearchFilterPipe
];


@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
    EmailValidatorDirective,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
  ],
})
export class SharedModule { }
