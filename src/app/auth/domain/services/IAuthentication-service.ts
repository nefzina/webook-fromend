import {Observable} from "rxjs";
import {LoginRequestDto} from "../dtos/LoginRequestDto";

export interface IAuthenticationService {
  authenticate(user: LoginRequestDto): Observable<number|null>;
}

// interface qui définit méthode authenticate implémentée dans Authentication-service qui est un service injectable dans angular. Ce service utilise HttpClient pour envoyer des requêtes HTTP à un serveur.
