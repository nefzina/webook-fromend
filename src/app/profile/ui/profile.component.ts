import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../domain/services/profile.service";
import {IUser} from "../domain/interface/IUser";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
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
