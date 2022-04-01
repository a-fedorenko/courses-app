import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
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
    private router: Router
  ) { }

  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.configUrl}/login`, user)
      .pipe(
        tap(({result}) => {
          let token = result.split(' ');
          this.sessionStorage.setToken(token[1]);
          this.isAuthorized$$.next(true);
        }),
        catchError(error => of(error))
      )
  }

  logout() {
    return this.http.delete(`${this.configUrl}/logout`)
      .pipe(
        tap(() => {
          this.sessionStorage.deleteToken();
          this.isAuthorized$$.next(false);
          this.router.navigate(['/login']);
        })
      )
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.configUrl}/register`, user)
      .pipe(
        tap(() => {
          this.router.navigate(['/login']);
        }),
        catchError(error => of(error))
      )
  }

  get isAuthorized$(): Observable<boolean> {
    return this.isAuthorized$$.asObservable();
  }
}
