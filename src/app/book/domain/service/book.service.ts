import { Injectable } from '@angular/core';
import {Book} from "../models/book";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookList: Book[] | undefined;
  constructor() { }



}
