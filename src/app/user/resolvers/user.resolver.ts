import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/models/user-model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<{
  successful: boolean,
  result: User
}> {

  public constructor (private userService: UserService) {}

  resolve(): Observable<{
    successful: boolean,
    result: User
  }> {
    return this.userService.getUser();
  }
}
