import { Injectable } from '@angular/core';
import {IAuthenticationService} from "./IAuthentication-service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.httpClient.post<any>("http://localhost:8080/login", JSON.stringify({username, password}), {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true,
      observe: "response"
    }).pipe(
      map(response => {
        if (response.status === 200) {
          localStorage.setItem('loggedIn', "true");
          return true;
        }
        return false;
      }))
  }

  register(username: string, firstname: string, lastname: string, email: string, password: string, zipCode: string, city: string, bookPreferences: string): Observable<boolean> {
    return this.httpClient.post<any>("http://localhost:8080/register", JSON.stringify({username, firstname, lastname, email, password, zipCode, city, bookPreferences}), {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true,
      observe: "response"
    }).pipe(
      map(response => {
        if (response.status === 200) {
          return true;
        }
        return false;
      }))
  }




}
