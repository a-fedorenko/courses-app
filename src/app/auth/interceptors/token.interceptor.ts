import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, mergeMap, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthStateFacade } from '../store/auth.facade';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authFacade: AuthStateFacade,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.authFacade.isAuthorized$
      .pipe(
        mergeMap((value) => this.authFacade.getToken$
          .pipe(
            tap(token => {
              if(value) {
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}` ?? null
                  }
                });
              }
            })
          )
        )
      ).subscribe()

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
