import {Injectable} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Observable, tap} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user!: User;
  constructor(private apiService: ApiService) {
  }

  getUserById(id : number): Observable<User> {
    return this.apiService.getById<User>(id, 'users').pipe(
      tap(response => this.user = response)
    )
  }
}
