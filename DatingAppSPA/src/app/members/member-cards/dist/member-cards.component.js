"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberCardsComponent = void 0;
var core_1 = require("@angular/core");
var angular_jwt_1 = require("@auth0/angular-jwt");
var MemberCardsComponent = /** @class */ (function () {
    function MemberCardsComponent(authService, userService, alertify) {
        this.authService = authService;
        this.userService = userService;
        this.alertify = alertify;
        this.helper = new angular_jwt_1.JwtHelperService();
    }
    MemberCardsComponent.prototype.ngOnInit = function () { };
    MemberCardsComponent.prototype.sendLike = function (recipientId) {
        var _this = this;
        this.userToken = localStorage.getItem('token');
        this.decodedToken = this.helper.decodeToken(this.userToken);
        this.userService.sendLike(this.decodedToken.nameid, recipientId).subscribe(function (data) {
            _this.alertify.success('You have liked: ' + _this.user.knownAs);
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    __decorate([
        core_1.Input()
    ], MemberCardsComponent.prototype, "user");
    MemberCardsComponent = __decorate([
        core_1.Component({
            selector: 'app-member-cards',
            templateUrl: './member-cards.component.html',
            styleUrls: ['./member-cards.component.scss']
        })
    ], MemberCardsComponent);
    return MemberCardsComponent;
}());
exports.MemberCardsComponent = MemberCardsComponent;
