import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Book} from "../book/domain/models/book";
import {IUser} from "../profile/domain/interface/IUser";
import {environment} from "../../environments/environment";
import {LoginRequestDto} from "../auth/domain/dtos/LoginRequestDto";
import {User} from "../auth/domain/models/User";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem("authToken")
    return new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    })
  }

  get<T>(endpoint: string, credential: boolean): Observable<T> {
    return this.http.get<T>(`${environment.API_URL}/${endpoint}`, {
      headers: this.getAuthHeaders(),
      withCredentials: credential,
    })
  }

  getById<T>(id: number, endpoint: string, credential: boolean): Observable<T> {
    return this.http.get<T>(`${environment.API_URL}/${endpoint}/${id}`, {
      headers: this.getAuthHeaders(),
      withCredentials: credential,
    })
  }

  post<T>(endpoint: string, body: Book | IUser | LoginRequestDto | User, credential: boolean): Observable<T> {
    return this.http.post<T>(`${environment.API_URL}/${endpoint}`, body, {
      headers: this.getAuthHeaders(),
      withCredentials: credential,
    });
  }

  put<T>(endpoint: string, id: number, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${environment.API_URL}/${endpoint}/${id}`, body, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  delete<T>(endpoint: string, id: number): Observable<T> {
    return this.http.delete<T>(`${process.env["BACKEND_URL "]}/${endpoint}/${id}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    })
  }
}
