import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {jwtDecode} from "jwt-decode";

export const AuthGuard: CanActivateFn = (): boolean => {
  const router: Router = inject(Router);
  const token = localStorage.getItem("token");
  console.log(token)

  if (token && jwtDecode(token)) {
    console.log(jwtDecode(token));
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}
