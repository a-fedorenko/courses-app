import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: "",
    password: ""
  };
  isRegistration: boolean = false;

  @Input() isLogin: boolean;
  @Output() isLoginChange: EventEmitter<boolean> =  new EventEmitter<boolean>();
  @Output() isRegistrationChange: EventEmitter<boolean> =  new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    //alert(JSON.stringify(form.value, null, 2));
  }

  login() {
    this.isLogin = false;
    this.isLoginChange.emit(this.isLogin);
  }

  goToRegistration() {
    this.isLogin = false;
    this.isRegistration = true;
  }

  goToLogin(data: boolean) {
    this.isLogin = data;
    this.isRegistration = false;
  }

}
