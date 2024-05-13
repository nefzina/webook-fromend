import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./auth/login/login.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'profile',
    loadComponent: () => import('./profile/ui/profile.component')
      .then(r => r.ProfileComponent)
  },
  {
    path: 'update-profile',
    loadComponent: () => import('./profile/ui/update-profile/update-profile.component')
      .then(r => r.UpdateProfileComponent)
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
    component: LoginComponent
  },
  {path: '**', redirectTo: ''},

];

