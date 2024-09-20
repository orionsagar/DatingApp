import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/_models/message';
import { PaginatedResult, Pagination } from 'src/app/_models/Pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { tap, map } from 'rxjs/operators';
import * as _ from 'underscore';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() userId: number;
  messages: Message[];
  newMessages: any = {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    // console.log(this.userId);
    const currentUserId = +this.authService.decodedToken.nameid;
    this.userService
      .getMessageThread(this.authService.decodedToken.nameid, this.userId)
      .pipe(
        tap((messages) => {
          _.each(messages, (message: Message) => {
            if (
              message.isRead === false &&
              message.recipientId === currentUserId
            ) {
              this.userService.markAsRead(currentUserId, message.id);
            }
          });
        })
      )
      .subscribe(
        (messages: any) => {
          //console.log(messages);
          this.messages = messages;
        },
        (error) => {
         // console.log(error);
          this.alertify.error(error);
        }
      );
  }

  sendMessage() {
    this.newMessages.recipientId = this.userId;
    this.userService
      .sendMessages(this.authService.decodedToken.nameid, this.newMessages)
      .subscribe(
        (message: any) => {
          this.messages.unshift(message);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }
}
