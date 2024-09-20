"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MessagesResolver = void 0;
var core_1 = require("@angular/core");
var MessagesResolver = /** @class */ (function () {
    function MessagesResolver(authService, userService, router, alertify) {
        this.authService = authService;
        this.userService = userService;
        this.router = router;
        this.alertify = alertify;
        this.pageSize = 4;
        this.pageNumber = 1;
        this.messageContainer = 'Unread';
    }
    MessagesResolver.prototype.resolve = function (route) {
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer);
    };
    MessagesResolver = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], MessagesResolver);
    return MessagesResolver;
}());
exports.MessagesResolver = MessagesResolver;
