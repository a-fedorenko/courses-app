import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionStorageService } from './auth/services/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor (
    private sessionStorage: SessionStorageService,
  ) {}

  ngOnInit () {
    const token = sessionStorage.getItem('token');
    if (token !== null && token !== '') {
      this.sessionStorage.setToken(token);
    }
  }

}
