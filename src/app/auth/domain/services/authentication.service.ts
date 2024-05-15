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
    return this.httpClient.post<any>(`${environment.API_URL}/login`, user, {
      headers: {
        "content-type": "application/json"
      },
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

  register(user: User): Observable<Boolean> {
    return this.httpClient.post<any>(`${environment.API_URL}/register`, user, {
      headers: {
        "content-type": "application/json"
      },
      observe: "response"
    }).pipe(
      map(response => {
        return response.status === 201;
      }))
  }

  /*
  logout(): void {
    // Supprimez l'indicateur de connexion de l'utilisateur du stockage local
    localStorage.removeItem('loggedIn');

    this.httpClient.post<any>("http://localhost:8080/logout", { withCredentials: true }).subscribe();
  }
*/
}
