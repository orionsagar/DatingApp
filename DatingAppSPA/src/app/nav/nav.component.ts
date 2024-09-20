import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  username: any;
  deToken: any;
  helper = new JwtHelperService();
  photoUrl: string;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loggedIn();
    this.authService.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );
  }

  logout(): void {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('logged out');
    this.router.navigate(['/home']);
  }

  // tslint:disable-next-line:typedef
  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    // console.log(this.helper.decodeToken(localStorage.getItem('token')));
    this.deToken = this.helper.decodeToken(localStorage.getItem('token'));
    this.username = this.deToken?.unique_name;
    return this.authService.loggedIn();
  }
}
