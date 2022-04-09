import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "src/app/core/models/user-model";
import { AuthActions } from './auth.actions';
import { AuthState } from "./auth.reducer";
import { AuthSelectors } from "./auth.selectors";


@Injectable({
  providedIn: 'root'
})

export class  AuthStateFacade {

  getToken$: Observable<string | null> = this.store.pipe(select(AuthSelectors.getToken));
  isAuthorized$: Observable<boolean> = this.store.pipe(select(AuthSelectors.isUserAuthorized));
  getLoginErrorMessage$: Observable<string | null> = this.store.pipe(select(AuthSelectors.getSpecificErrorMessage));
  getRegisterErrorMessage$: Observable<string | null>;

  constructor(private store: Store<AuthState>) {}

  login(body: User): void {
    this.store.dispatch(AuthActions.requestLogin(body));
  }

  register(body: User): void {
    this.store.dispatch(AuthActions.requestRegister(body));
  }

  logout(): void {
    this.store.dispatch(AuthActions.requestLogout());
  }

  closeSession() {
    this.store.dispatch(AuthActions.requestLogoutSuccess({
      isAuthorized: false,
      token: null
    }));
  }

}
