import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Book} from "../models/book";

@Injectable({
  providedIn: 'root'
})
export class MockBookService {
  bookList: Book[] = [
    new Book(1, 'Nom du livre 1', 'Image du livre 1', 'Auteur du livre 1', 'Edition du livre 1', 'Résumé du livre 1', 'ISBN du livre 1', 'Critique du livre 1'),
    new Book(2, 'Nom du livre 2', 'Image du livre 2', 'Auteur du livre 2', 'Edition du livre 2', 'Résumé du livre 2', 'ISBN du livre 2', 'Critique du livre 2'),
  ];

  constructor() { }

  getBookList(): Observable<Book[]> {
    return of(this.bookList);
  }
}
