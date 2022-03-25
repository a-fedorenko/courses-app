import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/core/models/user-model';
import { SessionStorageService } from './session-storage.service';

export interface Response {
  successful: boolean,
  result: string,
  user: User
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  configUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
  ) { }

  login(user: User): Observable<Response> {
    return this.http.post<Response>(`${this.configUrl}/login`, user)
      .pipe(
        tap(({result}) => {
          let token = result.split(' ');
          this.sessionStorage.setToken(token[1]);
        })
      )
  }

  logout(): Observable<User> {
    return this.http.delete<User>(`${this.configUrl}/logout`)
      .pipe(
        tap(() => {
          this.sessionStorage.deleteToken();
          this.isAuthorized$$.next(false);
        })
      )
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.configUrl}/register`, user);
  }

  isAuthorized$(): Observable<boolean> {
    return this.isAuthorized$$.asObservable();
  }
}
