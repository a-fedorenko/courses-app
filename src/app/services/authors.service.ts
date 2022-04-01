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

  getAll(): Observable<{
    successful: boolean,
    result: Author[]
  }> {
    return this.http.get<{
      successful: boolean,
      result: Author[]
    }>(`${this.configUrl}/authors/all`);
  }

  addAuthor(name: string): Observable<{
    successful: boolean,
    result: Author
  }> {
    return this.http.post<{
      successful: boolean,
      result: Author
    }>(`${this.configUrl}/authors/add`, {name: name});
  }

  getAuthor(id: string): Observable<{
    successful: boolean,
    result: Author
  }> {
    return this.http.get<{
      successful: boolean,
      result: Author
    }>(`${this.configUrl}/authors/${id}`);
  }

  editAuthor(author: Author): Observable<{
    successful: boolean,
    result: Author
  }> {
    return this.http.put<{
      successful: boolean,
      result: Author
    }>(`${this.configUrl}/authors/${author.id}`, author.name);
  }

  deleteAuthor(id: string): Observable<{
    successful: boolean,
    result: string
  }> {
    return this.http.delete<{
      successful: boolean,
      result: string
    }>(`${this.configUrl}/authors/${id}`);
  }
}
