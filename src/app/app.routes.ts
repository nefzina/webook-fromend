import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BookDetailComponent} from "./components/book/book-detail/book-detail.component";
import {PageBookComponent} from "./page-book/page-book.component";
import {PageRechercheComponent} from "./page-recherche/page-recherche.component";
import {LoginComponent} from "./auth/ui/login/login.component";
import {RegisterComponent} from "./auth/ui/register/register.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'page-book/:id', component: BookDetailComponent},
  { path: 'recherche', component: PageRechercheComponent },

  {
    path: 'profile',
    loadComponent: () => import('./profile/ui/profile.component')
      .then(r => r.ProfileComponent)
  },

  // { path: 'book',
  //   loadComponent: () => import('./page-book.component')
  //     .then(r => r.PageBookComponent)
  // },
  {
    path:'login',
    component: LoginComponent
  },

  {
    path:'register',
    component: RegisterComponent
  },
  {path: '**', redirectTo: ''},
];
