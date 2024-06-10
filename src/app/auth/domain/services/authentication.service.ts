import {Injectable} from '@angular/core';
import {IAuthenticationService} from "./IAuthentication-service";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LoginRequestDto} from "../dtos/LoginRequestDto";
import {User} from "../models/User";
import {environment} from "../../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements IAuthenticationService {

  constructor(private httpClient: HttpClient) {
  }

  authenticate(user: LoginRequestDto): Observable<boolean> {
    console.log(user);
    return this.httpClient.post<any>(`${environment.API_URL}/login`, JSON.stringify(user), {
      headers: {
        "content-type": "application/json"
      },
      withCredentials: true,
      observe: "response"
    }).pipe(
      map(response => {
        if (response.status === 200) {
          localStorage.setItem('loggedIn', "true");
           localStorage.setItem('userId',response.body.id); // pour stocker l'id de l'utilisateur
          return true;
        }
        return false;
      }))
  }

  register(user: User): Observable<Boolean> {
    console.log(user);
    return this.httpClient.post<any>(`${environment.API_URL}/register`, JSON.stringify(user), {
      headers: {

        "content-type": "application/json"
      },
      withCredentials:true,
      observe: "response"
    }).pipe(
      map(response => {
        return response.status === 201;
      }))
  }

  getUserId(): string {
       return localStorage.getItem('userId')??'';
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === "true";
  }
/*
  logout(): void {
    // Supprimez l'indicateur de connexion de l'utilisateur du stockage local
    localStorage.removeItem('loggedIn');

    this.httpClient.post<any>("http://localhost:8080/logout", { withCredentials: true }).subscribe();
  }
*/
}
