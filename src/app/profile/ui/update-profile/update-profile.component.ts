import {Component, OnInit} from '@angular/core';
import {IUser} from "../../domain/interface/IUser";
import {ProfileService} from "../../domain/services/profile.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ICategory} from "../../domain/interface/ICategory";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule
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

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    // this.profileService.getCategoryById(1).subscribe(response => this.category = response);
    // console.log(this.category)
    this.profileService.getCategories().subscribe(response => this.categories = response);
    console.log(this.categories)
  }


  // @Input() user: IUser;
}
