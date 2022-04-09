import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { UserActions } from "./user.actions";
import { UserState } from "./user.reducer";
import { UserSelectors } from "./user.selectors";

@Injectable({
  providedIn: 'root'
})

export class  UserStateFacade {

  name$: Observable<string | null> = this.store.pipe(select(UserSelectors.getName));
  isAdmin$: Observable<boolean> = this.store.pipe(select(UserSelectors.isAdmin));

  constructor(private store: Store<UserState>) {}

  getCurrentUser(): void {
    this.store.dispatch(UserActions.requestCurrentUser());
  }

}
