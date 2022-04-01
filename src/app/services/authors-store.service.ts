import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, pluck, tap } from 'rxjs';
import { Author, AuthorsService } from './authors.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorsStoreService {

  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);

  get isLoading$(): Observable<boolean> {
    return this.isLoading$$.asObservable();
  }

  get authors$(): Observable<Author[]> {
    return this.authors$$.asObservable();
  }

  constructor(
    private authorsService: AuthorsService
  ) { }

  getAll(): Observable<Author[]> {
    return this.authorsService.getAll()
      .pipe(
        pluck('result'),
        tap(authors => {
          this.authors$$.next(authors);
        })
      );
  }

  addAuthor(name: string): Observable<Author> {
    return this.authorsService.addAuthor(name)
      .pipe(
        pluck('result'),
      );
  }

  getAuthor(id: string): Observable<Author> {
    return this.authorsService.getAuthor(id)
      .pipe(
        pluck('result'),
      );
  }
}
