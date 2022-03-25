import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {

  constructor (
    private auth: AuthService,
    private router: Router) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> {
    return this.auth.isAuthorized$()
      .pipe(
        tap((value) => {
          if(!value) {
            this.router.navigate(['/login']);
          }
        })
      )
  }
}
