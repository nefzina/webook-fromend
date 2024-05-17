import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {TokenService} from "../domain/services/token.service";

export const AuthGuard: CanActivateFn = (): boolean => {

  const router: Router = inject(Router);
  const tokenService: TokenService = inject(TokenService);

  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn === "true" && !tokenService.tokenExpired()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}
