import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {jwtDecode} from "jwt-decode";

export const AuthGuard: CanActivateFn = (): boolean => {
  const router: Router = inject(Router);
  const isLoggedIn = localStorage.getItem("loggedIn");

  if (isLoggedIn === 'true') {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}
