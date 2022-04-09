import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthStateFacade } from '../store/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {

  constructor (
    private authFacade: AuthStateFacade,
    private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> {
    return this.authFacade.isAuthorized$
      .pipe(
        tap((value) => {
          if(!value) {
            this.router.navigate(['/login']);
          }
        })
      )
  }
}
