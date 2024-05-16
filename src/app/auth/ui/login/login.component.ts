import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AuthenticationService} from "../../domain/services/authentication.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {LoginRequestDto} from "../../domain/dtos/LoginRequestDto";
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, FormsModule, MatButtonModule, MatIcon, ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  loginError = "";
  hidePassword = true;


  constructor(private authService: AuthenticationService, private router: Router) {
  }


  login() {

    if (this.email !== "" && this.password !== "") {
      const loginDto = new LoginRequestDto(this.email, this.password);

      this.authService.authenticate(loginDto).subscribe(
        (isLoggedIn: any) => {
          if (isLoggedIn) {
            this.router.navigate(['/home']);
          } else {
            this.loginError = "Nom d'utilisateur ou mot de passe incorrect.";
          }
        },
        (error) => {
          this.loginError = "Une erreur s'est produite lors de la tentative de connexion.";
        }
      );
    } else {
      console.error('Username or password is empty'); // Affiche une erreur si le nom d'utilisateur ou le mot de passe est vide
    }
  }


}


