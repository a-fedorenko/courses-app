import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Author } from "src/app/services/authors.service";
import { AuthorsActions } from "./authors.actions";
import { AuthorsState } from "./authors.reducer";
import { AuthorsSelectors } from "./authors.selectors";

@Injectable({
  providedIn: 'root'
})

export class  AuthorsStateFacade {

  addedAuthor$: Observable<Author | null> = this.store.pipe(select(AuthorsSelectors.getAddedAuthor));
  authors$: Observable<Author[] | []> = this.store.pipe(select(AuthorsSelectors.getAuthors));

  constructor(private store: Store<AuthorsState>) {}

  getAuthors(): void {
    this.store.dispatch(AuthorsActions.requestAuthors());
  }

  addAuthor(name: string) {
    this.store.dispatch(AuthorsActions.requestAddAuthor({name}));
  }

}
