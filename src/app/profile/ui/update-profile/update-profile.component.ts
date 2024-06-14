import {Component, OnInit} from '@angular/core';
import {IUser} from "../../domain/interface/IUser";
import {ProfileService} from "../../domain/services/profile.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ICategory} from "../../domain/interface/ICategory";
import {CommonModule} from "@angular/common";
import {MatChipsModule} from '@angular/material/chips';
import {type} from "node:os";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {
  user!: IUser;
  categories!: ICategory[];
  category!: ICategory;
  defaultProfilePic: String = '../../../assets/profile.png'
  hide = true;
  userForm: FormGroup;
  regex = {
    username: "^[a-zA-Z_.]{2,20}$",
    password:"^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*-])(?=\\S+$).{8,20}$",
    city:"^[a-zA-Z-]{2,20}$",
    zipCode:"^\\d{5}$"
  }

  constructor(private profileService: ProfileService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.pattern(this.regex.username)],
      password: ['', Validators.pattern(this.regex.password)],
      city: ['', Validators.pattern(this.regex.city)],
      zip_code: ['', Validators.pattern(this.regex.zipCode)]
    });
  }

  ngOnInit() {
    this.profileService.getUserById(1).subscribe((response) => {
      this.user = response;
      console.log(response);
    })

    this.profileService.getCategories().subscribe(response => this.categories = response);
    console.log(this.categories)
  }

  isCategorySelected(category: ICategory): boolean {
    return !!this.user.preferences.find(pref => pref.type === category.type);
  }

  updateUser(){
    if(this.userForm.valid){
      console.log(this.userForm)
    }
  }
}
