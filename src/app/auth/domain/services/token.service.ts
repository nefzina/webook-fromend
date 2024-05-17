import {Injectable} from '@angular/core';
import {CookieService as ngxService} from "ngx-cookie-service";
import {jwtDecode} from "jwt-decode";
import {TokenData} from "../models/TokenData";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private ngxService: ngxService, private authService: AuthenticationService) {
  }

  getTokenDataFromCookie(): TokenData | null {
    const token = this.ngxService.get("userToken");  // retrieve token from the browser cookie
    console.log("token", token);
    return token ? jwtDecode(token) : null;
  }

  tokenExpired(): Boolean {
    const tokenData = this.getTokenDataFromCookie();
    if (tokenData) {
      const expiresIn = new Date(1000 * tokenData.exp);
      const timeout = expiresIn.getTime() - Date.now();
      setTimeout(() => {
        this.authService.logout();
      }, timeout);
      return false
    }
    return true
  }
}
