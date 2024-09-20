import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from '../_models/message';
import { PaginatedResult } from '../_models/Pagination';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Injectable({ providedIn: 'root' })
export class MessagesResolver implements Resolve<PaginatedResult<Message[]>> {
  pageSize = 4;
  pageNumber = 1;
  messageContainer = 'Unread';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<PaginatedResult<Message[]>> {
    return this.userService.getMessages(
      this.authService.decodedToken.nameid,
      this.pageNumber,
      this.pageSize,
      this.messageContainer
    );
  }
}
