import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss'],
})
export class MemberEditComponent implements OnInit {
  user: User;
  model: any;
  userToken: any;
  decodedToken: any;
  helper = new JwtHelperService();
  photoUrl: string;

  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alertify: AlertifyService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      // console.log(data);
      this.user = data['user'].result;
    });
    this.authService.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );
  }

  updateUser() {
    this.userToken = localStorage.getItem('token');
    this.decodedToken = this.helper.decodeToken(this.userToken);

    this.userService.updateUser(this.decodedToken.nameid, this.user).subscribe(
      (next) => {
        // console.log(this.user);
        this.alertify.success('Profile Updated Successfully');
        this.editForm.reset(this.user);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  UpdateMainPhoto(photourl) {
    this.user.photoUrl = photourl;
  }
}
