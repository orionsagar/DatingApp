import { Component, Input, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-cards',
  templateUrl: './member-cards.component.html',
  styleUrls: ['./member-cards.component.scss'],
})
export class MemberCardsComponent implements OnInit {
  @Input() user: User;
  userToken: any;
  decodedToken: any;
  helper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  sendLike(recipientId: number) {
    this.userToken = localStorage.getItem('token');
    this.decodedToken = this.helper.decodeToken(this.userToken);
    this.userService.sendLike(this.decodedToken.nameid, recipientId).subscribe(
      (data) => {
        this.alertify.success('You have liked: ' + this.user.knownAs);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
