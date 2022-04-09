import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthStateFacade } from 'src/app/auth/store/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private authFacade: AuthStateFacade
  ) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.authFacade.login(form.value);
  }

}
