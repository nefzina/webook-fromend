import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";

import {BookDetailComponent} from "./components/book/book-detail/book-detail.component";
import {PageBookComponent} from "./page-book/page-book.component";
import {PageRechercheComponent} from "./page-recherche/page-recherche.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'page-book/:id', component: BookDetailComponent},
  { path: 'recherche', component: PageRechercheComponent },

];
