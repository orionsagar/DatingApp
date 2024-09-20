import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class MemberEditResolver implements Resolve<User> {
  userToken: any;
  decodedToken: any;
  helper = new JwtHelperService();

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<User> | Promise<User> | User {
    this.userToken = localStorage.getItem('token');
    this.decodedToken = this.helper.decodeToken(this.userToken);
    // console.log(this.decodedToken);
    // console.log(this.decodedToken.nameid);
    // console.log(this.authService.decodedToken.id);
    return this.userService.getUser(this.decodedToken.nameid);
  }
}
