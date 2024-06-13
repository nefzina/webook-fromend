import { Injectable } from '@angular/core';
import {Book} from "../models/book";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookList: Book[] | undefined;
  constructor() { }


  createBook(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>, ownerId: number) {

  }
}
