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

  createBook(book: FormData, ownerId: string): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/${ownerId}`, book);
  }
}


/*


import { Injectable } from '@angular/core';
import {IAuthenticationService} from "./IAuthentication-service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  constructor(private httpClient: HttpClient) { }register(username: string, email: string, password: string, confirmPassword:string): Observable<boolean> {
    return this.httpClient.post<any>("http://localhost:8080/register", JSON.stringify({username, email, password, confirmPassword}), {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true,
      observe: "response"
    }).pipe(
      map(response => {
        if (response.status === 201) {
          return true;
        }
        return false;
      }))
  }*/


