import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  @Input() isRegistration: boolean;
  @Output() isRegistrationChange: EventEmitter<boolean> =  new EventEmitter<boolean>();
  @Output() isLogin: EventEmitter<boolean> =  new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  submit() {
    this.registrationForm.disable();
  }

  goToLogin() {
    this.isLogin.emit(true);
  }

}
