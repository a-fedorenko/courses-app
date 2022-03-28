import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  configUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
  ) { }

  getUser(): Observable<{
    successful: boolean,
    result: User
  }> {
    return this.http.get<{
      successful: boolean,
      result: User
    }>(`${this.configUrl}/users/me`);
  }
}
