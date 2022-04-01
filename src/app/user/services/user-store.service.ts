import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from 'src/app/core/models/user-model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private name$$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    public userService: UserService
  ) { }

  isAdmin(): Observable<{
    successful: boolean,
    result: User
  }> {
    return this.userService.getUser()
      .pipe(
        tap(value => {
          this.name$$.next(value.result.name);
          if(value.result.role === 'admin') {
            this.isAdmin$$.next(true);
          } else {
            this.isAdmin$$.next(false);
          }
        })
      );
  }

  get name$(): Observable<string | null> {
    return this.name$$.asObservable();
  }

  get isAdmin$(): Observable<boolean> {
    return this.isAdmin$$.asObservable();
  }

}
