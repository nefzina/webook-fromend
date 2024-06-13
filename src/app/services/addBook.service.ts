import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Book} from "../book/domain/models/book";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AddBookService {
  book!: Book;

  constructor(private apiService: ApiService) {
  }

  createBook(book: Book): Observable<Book> {
    return this.apiService.post<Book>('books', book).pipe(
      tap(response => {
        this.book = response;
        return response;
      }))
      ;
  }
}
