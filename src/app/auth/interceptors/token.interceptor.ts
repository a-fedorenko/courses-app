import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private sessionStorage: SessionStorageService,
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.auth.isAuthorized$().subscribe(
      value => {
        if(value) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${this.sessionStorage.getToken()}` ?? ''
            }
          });
        }
      }
    )
    return next.handle(request)
      .pipe(
        catchError(
          (error: HttpErrorResponse) => this.handleAuthError(error)
        )
      );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    if(error.status === 401) {
      this.router.navigate(['/login']);
    }
    return throwError(() => error);
  }
}
