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

  configUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.configUrl}/authors/all`);
  }

  addAuthor(author: Author) {
    return this.http.post(`${this.configUrl}/authors/add`, author);
  }
}
