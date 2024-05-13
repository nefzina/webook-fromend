import { Injectable } from '@angular/core';
import {Book} from "../models/book";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookList: Book[] | undefined;

    mockBooks = [
        {id: 1, name: 'Du même bois',image: 'assets/pictures/Du-meme-bois.jpg',category:'Aventure', author: 'Marion Fayolle', edition: 'Gallimard', resume: 'Les enfants, les bébés, ils les appellent les “petitous”. Et c\'est vrai qu\'ils sont des petits touts. Qu\'ils sont un peu de leur mère, un peu de leur père, un peu des grands-parents, un peu de ceux qui sont morts, il y a si longtemps. Tout ce qu\'ils leur ont transmis, caché, inventé. Tout. C\'est pas toujours facile d\'être un petit tout, d\'avoir en soi autant d\'histoires, autant de gens, de réussir à les faire taire pour inventer encore une petite chose à soi.', isbn: '2073025811',review: ''},
        {id: 2, name: 'La louisiane',image: 'assets/pictures/La-Louisiane.jpg',category:'Policier', author: 'test2', edition: '', resume: '', isbn: '',review: '', map:'Brest'},
        {id: 3, name: 'La vie heureuse',image: 'assets/pictures/La-vie-heureuse.jpg',category:'Amour', author: 'test3', edition: '', resume: '', isbn: '',review: '', map:'Paris'},
        {id: 4, name: 'Les Yeux de Mona',image: 'assets/pictures/Les-Yeux-de-Mona.jpg',category:'Horreur', author: 'test4', edition: '', resume: '', isbn: '',review: '', map:'Brest'},
        {id: 5, name: 'Un soir d\'éte',image: 'assets/pictures/Un-soir-d-ete.jpg',category:'', author: 'test5', edition: '', resume: '', isbn: '',review: '',map:'Brest'},
        {id: 6, name: 'Du même bois',image: 'assets/pictures/Du-meme-bois.jpg',category:'', author: 'test6', edition: '', resume: '', isbn: '',review: '', map:'Brest'},
        {id: 7, name: 'Du même bois',image: 'assets/pictures/Du-meme-bois.jpg',category:'', author: 'test7', edition: '', resume: '', isbn: '',review: '', map:'Paris'},
        {id: 8, name: 'Du même bois',image: 'assets/pictures/Du-meme-bois.jpg',category:'', author: 'test8', edition: '', resume: '', isbn: '',review: '', map:'Paris'},
        {id: 9, name: 'Du même bois',image: 'assets/pictures/Du-meme-bois.jpg',category:'', author: 'test9', edition: '', resume: '', isbn: '',review: ''},
        {id: 10, name: 'Du même bois',image: 'assets/pictures/Du-meme-bois.jpg',category:'', author: 'test10', edition: '', resume: '', isbn: '',review: ''},
    ]


  constructor(private http: HttpClient) { }

  getAuthors(){
      const authors = this.mockBooks.map(book=> book.author);
      return [new Set(authors)]
  }
  getBookById(id: number) {
      return this.mockBooks.find(book => book.id === id);
  }

  getBookList(config: string): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:8080').pipe(
      tap((bookList) => console.table(bookList)),
      catchError((error) => {
        console.log(error);
        return of([]);
      })
    );
  }

}
