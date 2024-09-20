"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessagesComponent = void 0;
var core_1 = require("@angular/core");
var _ = require("underscore");
var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(userService, alertify, router, authService) {
        this.userService = userService;
        this.alertify = alertify;
        this.router = router;
        this.authService = authService;
        this.messageContainer = 'Unread';
    }
    MessagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.data.subscribe(function (data) {
            _this.messages = data['messages'].result;
            _this.pagination = data['messages'].pagination;
        });
    };
    MessagesComponent.prototype.loadMessages = function () {
        var _this = this;
        this.userService
            .getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
            .subscribe(function (res) {
            _this.messages = res.result;
            _this.pagination = res.pagination;
        }, function (error) {
            // console.log(error);
            _this.alertify.error(error);
        });
    };
    MessagesComponent.prototype.deleteMessage = function (id) {
        var _this = this;
        this.alertify.confirm('Are you sure you want to delete this message?', function () {
            _this.userService
                .deleteMessage(id, _this.authService.decodedToken.nameid)
                .subscribe(function () {
                _this.messages.splice(_.findIndex(_this.messages, { id: id }), 1);
                _this.alertify.success('Message has been deleted');
            }, function (error) {
                _this.alertify.error('Failed to delete message');
            });
        });
    };
    MessagesComponent.prototype.pageChanged = function (event) {
        // console.log('Page changed to: ' + event.page);
        // console.log('Number items per page: ' + event.itemsPerPage);
        this.pagination.currentPage = event.page;
        this.loadMessages();
    };
    MessagesComponent = __decorate([
        core_1.Component({
            selector: 'app-messages',
            templateUrl: './messages.component.html',
            styleUrls: ['./messages.component.css']
        })
    ], MessagesComponent);
    return MessagesComponent;
}());
exports.MessagesComponent = MessagesComponent;
