import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../domain/services/profile.service";
import {IUser} from "../domain/interface/IUser";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {response} from "express";
import {ICategory} from "../domain/interface/ICategory";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  user!: IUser;
  defaultProfilePic: String = '../../../assets/profile.png'

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    this.profileService.getUserById(1).subscribe((response) => {
      this.user = response;
      console.log(response);
    })
  }
}
