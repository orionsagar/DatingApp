import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';

@Injectable({ providedIn: 'root' })
export class MemberListResolver implements Resolve<PaginatedResult<User[]>> {
  pageSize = 4;
  pageNumber = 1;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<PaginatedResult<User[]>> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null, null);
  }
}
