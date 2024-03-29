import {Observable} from "rxjs";

export interface IAuthenticationService {
  authenticate(email:string, password: string): Observable<boolean>;
}

// interface qui définit méthode authenticate implémentée dans Authentication-service qui est un service injectable dans angular. Ce service utilise HttpClient pour envoyer des requêtes HTTP à un serveur.
