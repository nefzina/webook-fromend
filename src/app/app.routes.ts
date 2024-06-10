import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BookDetailComponent} from "./components/book/book-detail/book-detail.component";
import {PageBookComponent} from "./page-book/page-book.component";
import {PageRechercheComponent} from "./page-recherche/page-recherche.component";
import {LoginComponent} from "./auth/ui/login/login.component";
import {RegisterComponent} from "./auth/ui/register/register.component";
import {GuideComponent} from "./guide/guide.component";
import {AuthGuard} from "./auth/application/AuthGuard";
import {AddBookComponent} from "./add-book/add-book.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'page-book/:id', component: BookDetailComponent},
  { path: 'recherche', component: PageRechercheComponent },
  { path: 'addBook', component: AddBookComponent },

  {
    path: 'profile',
    loadComponent: () => import('./profile/ui/profile.component')
      .then(r => r.ProfileComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'update-profile',
    loadComponent: () => import('./profile/ui/update-profile/update-profile.component')
      .then(r => r.UpdateProfileComponent),
    canActivate: [AuthGuard],

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
    path:'addBook',
    component: AddBookComponent
  },
  {
    path:'guide',
    component: GuideComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {path: '**', redirectTo: ''},
];
