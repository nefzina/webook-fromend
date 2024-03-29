import { Injectable } from '@angular/core';
import {IAuthenticationService} from "./IAuthentication-service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  authenticate(email: string, password: string): Observable<boolean> {
    return this.httpClient.post<any>("http://localhost:8080/login", JSON.stringify({email, password}), {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true,
      observe: "response"
    }).pipe(
      map(response => {
        if (response.status === 201) {
          localStorage.setItem('loggedIn', "true");
          return true;
        }
        return false;
      }))
  }




  register(username: string, email: string, password: string, confirmPassword:string, city: string): Observable<boolean> {
    return this.httpClient.post<any>("http://localhost:8080/register", JSON.stringify({username, email, password, confirmPassword, city}), {
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
  }

  logout(): void {
    // Supprimez l'indicateur de connexion de l'utilisateur du stockage local
    localStorage.removeItem('loggedIn');

    this.httpClient.post<any>("http://localhost:8080/logout", { withCredentials: true }).subscribe();
  }



}
