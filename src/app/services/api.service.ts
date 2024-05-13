import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Book} from "../book/domain/models/book";
import {IUser} from "../profile/domain/interface/IUser";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {
  }

  private getAuthHeaders(): HttpHeaders {
    const token=localStorage.getItem("authToken")
    return new HttpHeaders({
      "Content-type": "application/json",
      "Authorization": `Bearer ${token}`
    })
  }
  get<T>( endpoint: string): Observable<T> {
    return this.http.get<T>(`${process.env["BACKEND_URL "]}/${endpoint}`, {
      headers: this.getAuthHeaders(),
      withCredentials: true,
    })
  }

  getById<T>(id: number, endpoint: string): Observable<T> {
    return this.http.get<T>(`${environment.API_URL}/${endpoint}/${id}`, {
      headers: this.getAuthHeaders(),
      // withCredentials: true,
    })
  }

  post<T>(endpoint: string, body: Book|IUser): Observable<T> {
    return this.http.post<T>(`${process.env["BACKEND_URL "]}/${endpoint}`, body,{
      headers: this.getAuthHeaders(),
      withCredentials: true,
    });
  }

  put<T>(endpoint: string, id:number, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${process.env["BACKEND_URL "]}/${endpoint}/${id}`, body, {
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
