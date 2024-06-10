import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, map, tap} from "rxjs";
import {FormControl, ɵValue} from "@angular/forms";
import {Book} from "../book/domain/models/book";
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AddBookService {


  private baseUrl = 'http://localhost:8080/books';

  constructor(private http: HttpClient) { }

  createBook(book: FormData): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/`,book,{
      withCredentials: true
    });
  }
}







