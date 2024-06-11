import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, map, tap} from "rxjs";
import {FormControl, ɵValue} from "@angular/forms";
import {Book} from "../book/domain/models/book";
import { CommonModule } from '@angular/common';
import {ApiService} from "./api.service";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class AddBookService {


book!:Book;

  constructor(private apiService:ApiService) { }

  createBook(book: Book): Observable<Book> {
    return this.apiService.post<Book>('books',book).pipe(
      tap(response=>{
        this.book=response;
        return response;
      }))
    ;
  }
}







