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
import {UserIdService} from "../../../services/userId.service";

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
  id: number = 0;
  categories!: ICategory[];
  category!: ICategory;
  defaultProfilePic: String = '../../../assets/profile.png'
  hide = true;
  userForm: FormGroup;
  selectedCategories: ICategory[] = [];
  regex = {
    username: "^[a-zA-Z_.]{2,20}$",
    password: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=*-])(?=\\S+$).{8,20}$",
    city: "^[a-zA-Z-]{2,20}$",
    zip_code: "^\\d{5}$"
  }

  constructor(private profileService: ProfileService, private fb: FormBuilder, private userIdService: UserIdService) {
    this.userForm = this.fb.group({
      username: ['', Validators.pattern(this.regex.username)],
      password: ['', Validators.pattern(this.regex.password)],
      city: ['', Validators.pattern(this.regex.city)],
      zip_code: ['', Validators.pattern(this.regex.zip_code)],
      categories: [null]
    });
  }

  ngOnInit() {
    this.userIdService.getUserId.subscribe(id => {
      this.id = id;
    });

    if (!!this.id) {
      this.profileService.getUserById(this.id).subscribe((response) => {
        this.user = response;
      })
    }

    this.profileService.getCategories().subscribe(response => this.categories = response);
  }

  isCategorySelected(category: ICategory): boolean {
    return this.user.preferences.includes(category);
  }

  onCategoryChange(category: ICategory, isSelected: boolean) {
    if (isSelected) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }

  updateUser() {
    this.userForm.patchValue({
      categories: this.selectedCategories
    });
    console.log(this.userForm);
    if (this.userForm.valid) {
      console.log("inside the if")
      console.log(this.userForm)
    }
  }
}
