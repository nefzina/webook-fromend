import {Component} from '@angular/core';
import { AuthenticationService } from '../../domain/services/authentication.service';

import { Router } from '@angular/router';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckbox} from "@angular/material/checkbox";
import { passwordMatchValidator } from '../../application/passwordMatch';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule, MatChipsModule, MatGridListModule, MatCheckbox, ReactiveFormsModule, MatIcon],
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup = this.formBuilder.group({});
hidePassword = true;



  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.createForm();
  }


  createForm() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      city: [''],
    }, { validator: passwordMatchValidator});
  }



  register() {
    //vérifie si le mot de passe et la confirmation sont identiques
    if (this.registerForm.invalid) {
      alert("Veuillez remplir correctement le formulaire.");
      return;
    }

    const { username, email, password, confirmPassword, city } = this.registerForm.value;

    //si les mots de passe correspondent, la méthode register du service d'authentification est appelée
    this.authService.register(username, email, password, confirmPassword, city).subscribe(
      (isRegistered) => {
        if (isRegistered) {
          this.router.navigate(['/login']);
        } else {
          console.error('Inscription échouée');
        }
      },
      (error) => {
        console.error('Erreur lors de l\'inscription', error);
      }
    );
  }
}
