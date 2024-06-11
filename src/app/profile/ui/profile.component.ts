// @ts-ignore

import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../domain/services/profile.service";
import {IUser} from "../domain/interface/IUser";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ICategory} from "../domain/interface/ICategory";
import {ApiService} from "../../services/api.service";
import {UploadService} from "../../services/upload.service";
import {IMedia} from "../domain/interface/IMedia";
import {UserIdService} from "../../services/userId.service";

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
  id: number = 0;
  user!: IUser;
  defaultProfilePic: String = '../../../assets/profile.png';

  constructor(private profileService: ProfileService, private apiService: ApiService,
              private uploadService: UploadService, private userIdService: UserIdService) {
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
  }

  uploadFile(event: Event) {
    this.uploadService.uploadFile(event).subscribe(
      {
        next: (res) => {
          this.user.profilePicture = res;
          this.profileService.updateUser(this.user.id);
        },
        error: (err) => console.error('Upload error', err),
      }
    )
  }
}
