"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberEditResolver = void 0;
var core_1 = require("@angular/core");
var angular_jwt_1 = require("@auth0/angular-jwt");
var MemberEditResolver = /** @class */ (function () {
    function MemberEditResolver(userService, router, alertify, authService) {
        this.userService = userService;
        this.router = router;
        this.alertify = alertify;
        this.authService = authService;
        this.helper = new angular_jwt_1.JwtHelperService();
    }
    MemberEditResolver.prototype.resolve = function (route) {
        this.userToken = localStorage.getItem('token');
        this.decodedToken = this.helper.decodeToken(this.userToken);
        // console.log(this.decodedToken);
        // console.log(this.decodedToken.nameid);
        // console.log(this.authService.decodedToken.id);
        return this.userService.getUser(this.decodedToken.nameid);
    };
    MemberEditResolver = __decorate([
        core_1.Injectable({ providedIn: 'root' })
    ], MemberEditResolver);
    return MemberEditResolver;
}());
exports.MemberEditResolver = MemberEditResolver;
