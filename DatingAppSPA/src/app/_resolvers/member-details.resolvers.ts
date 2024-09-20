import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MemberDetailsResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<User> | Promise<User> | User {
    return this.userService.getUser(route.params.id);
  }
}
