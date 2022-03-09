import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Author, AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsStoreService {

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authors$$: BehaviorSubject<Author[]>;

  constructor(
    private authorsService: AuthorsService
  ) { }

  getAll(): Observable<Author[]> {
    return this.authorsService.getAll();
  }

  addAuthor(author: Author) {
    this.authorsService.addAuthor(author);
  }

  isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }

  authors$(): Observable<Author[]> {
    this.isLoading$$.next(true);
    this.getAll().subscribe(authors => {
      this.authors$$ = new BehaviorSubject(authors);
      this.isLoading$$.next(false);
    })
    return this.authors$$.asObservable();
  }
}
