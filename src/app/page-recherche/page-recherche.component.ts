import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {BookService} from "../components/book/domain/service/book.service";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {async, map, Observable, startWith} from "rxjs";

export interface BookGroup {
  name: string;
  author: string;
}
export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};
@Component({
  selector:
    'app-page-recherche',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgForOf,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  templateUrl: './page-recherche.component.html',
    styleUrl: './page-recherche.component.scss'
})

export class PageRechercheComponent {

    searchText = '';
    books: any[] = [];
    mockBooks: any[]= [];
    categories = ['Historique', 'Aventure', 'Policier', 'Amour', 'Science-fiction', 'Fantasy', 'Fantastique', 'Horreur', 'Nouvelle', 'Biographie', 'Autobiographie', 'Journal', 'Poésie', 'En prose', 'Pastorale', 'Philosophique', 'Sonnet', 'Ode', 'Haïku', 'Théâtral', 'Epistolaire', 'Argumentatif'];
    value = '';
    authors: string[] | undefined;
    Maps: any;
    filterBook = false;
    suggestions: string[] = this.mockBooks; // Remplacez ceci par vos données
    filteredSuggestions: string[] = [];

    lat: number = 48.8566;
    lng: number = 2.3488;
    zoom: number = 12;

    bookFrom = this._formBuilder.group({bookGroup:'',});

    bookGroups: BookGroup[] = this.bookService.mockBooks;

    bookGroupOptions: Observable<BookGroup[]> | undefined;

  constructor(private bookService: BookService,
              private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.mockBooks = this.bookService.mockBooks;

    //this.authors = this.bookService.getAuthors();
    this.bookGroupOptions = this.bookFrom.get('bookGroup')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
  }
  onSearchChange(): void {
    this.filteredSuggestions = this.suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectSuggestion(suggestion: string): void {
    this.searchText = suggestion;
    this.filteredSuggestions = [];
  }
  private _filterGroup(value: string): BookGroup[] {
    if (value) {
      return this.bookGroups
        .map(group => ({author: group.author, name: group.name}))
    }
    return this.bookGroups;
  }
  onCategoryChange(value: any) {
    this.sortBooksByCategory(value);
    this.filterBook = true;
  }

  onAuthorChange(value: any) {
    this.sortBooksByAuthor(value);
    this.filterBook = true;
  }

  onMapChange(value: any) {
    this.sortBooksByMap(value);
    this.filterBook = true;
  }

  private sortBooksByCategory(category: any) {
    if (category) {
      this.mockBooks.sort((a, b) => a.category.localeCompare(b.category));
    } else {
      // Si aucune catégorie n'est sélectionnée, réinitialisez l'ordre des livres
      this.resetBookOrder();
    }
  }

  private sortBooksByAuthor(author: any) {
    if (author) {
      this.mockBooks.sort((a, b) => a.author.localeCompare(b.author));
    } else {
      // Si aucune catégorie n'est sélectionnée, réinitialisez l'ordre des livres
      this.resetBookOrder();
    }
  }

  private sortBooksByMap(map: any) {
    if (map) {
      this.mockBooks.sort((a, b) => a.map.localeCompare(b.map));
    } else {
      // Si aucune catégorie n'est sélectionnée, réinitialisez l'ordre des livres
      this.resetBookOrder();
    }
  }

  private resetBookOrder() {

  }
  showMap() {
    // @ts-ignore
    this.showMap = true;
  }

}
