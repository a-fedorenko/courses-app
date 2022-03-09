import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Author {
  id: string,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>('http://localhost:3000/api/authors/all');
  }

  addAuthor(author: Author) {
    return this.http.post('http://localhost:3000/api/authors/add', author);
  }
}
