import {Injectable} from '@angular/core';
import {ApiService} from "../../../services/api.service";
import {Observable, tap} from "rxjs";
import {User} from "../models/User";
import {ICategory} from "../interface/ICategory";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  user!: User;
  categories!: ICategory[];
  category!: ICategory;

  constructor(private apiService: ApiService) {
  }

  getUserById(id: number): Observable<User> {
    return this.apiService.getById<User>(id, 'users').pipe(
      tap(response => this.user = response)
    )
  }

  getCategories():Observable<ICategory[]> {
    return this.apiService.get<ICategory[]>('categories').pipe(
      tap(response => this.categories = response)
    )
  }

  getCategoryById(id:number):Observable<ICategory> {
    return this.apiService.getById<ICategory>(id, 'categories').pipe(
      tap(response => this.category = response)
    )
  }
}
