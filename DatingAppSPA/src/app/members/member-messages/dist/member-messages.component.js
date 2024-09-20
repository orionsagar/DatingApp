"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberMessagesComponent = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var _ = require("underscore");
var MemberMessagesComponent = /** @class */ (function () {
    function MemberMessagesComponent(authService, userService, router, alertify) {
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        this.alertify = alertify;
        this.newMessages = {};
    }
    MemberMessagesComponent.prototype.ngOnInit = function () {
        this.loadMessages();
    };
    MemberMessagesComponent.prototype.loadMessages = function () {
        var _this = this;
        // console.log(this.userId);
        var currentUserId = +this.authService.decodedToken.nameid;
        this.userService
            .getMessageThread(this.authService.decodedToken.nameid, this.userId)
            .pipe(operators_1.tap(function (messages) {
            _.each(messages, function (message) {
                if (message.isRead === false &&
                    message.recipientId === currentUserId) {
                    _this.userService.markAsRead(currentUserId, message.id);
                }
            });
        }))
            .subscribe(function (messages) {
            //console.log(messages);
            _this.messages = messages;
        }, function (error) {
            // console.log(error);
            _this.alertify.error(error);
        });
    };
    MemberMessagesComponent.prototype.sendMessage = function () {
        var _this = this;
        this.newMessages.recipientId = this.userId;
        this.userService
            .sendMessages(this.authService.decodedToken.nameid, this.newMessages)
            .subscribe(function (message) {
            _this.messages.unshift(message);
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    __decorate([
        core_1.Input()
    ], MemberMessagesComponent.prototype, "userId");
    MemberMessagesComponent = __decorate([
        core_1.Component({
            selector: 'app-member-messages',
            templateUrl: './member-messages.component.html',
            styleUrls: ['./member-messages.component.css']
        })
    ], MemberMessagesComponent);
    return MemberMessagesComponent;
}());
exports.MemberMessagesComponent = MemberMessagesComponent;
