import {Component} from '@angular/core';
import { AuthenticationService } from '../../domain/services/authentication.service';

import { Router } from '@angular/router';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, MatChipsModule, MatGridListModule, MatCheckbox],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  username: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  city: string = "";


  constructor(private authService: AuthenticationService, private router: Router) {
  }

  register() {
    //vérifie si le mot de passe et la confirmation sont identiques
    if (this.password !== this.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    //si les mots de passe correspondent, la méthode register du service d'authentification est appelée
    this.authService.register(this.username, this.email, this.password, this.confirmPassword, this.city).subscribe(
      (isRegistered) => {
        if (isRegistered) {
          //Si l'inscription est réussie, l'utilisateur est redirigé vers la page de connexion
          this.router.navigate(['/login']);
        } else {
          console.error('Inscription échouée');
        }
      },
      (error) => { //si erreur lors de l'appel à la méthode register message error
        console.error('Erreur lors de l\'inscription', error);
      }
    );
  }
}
