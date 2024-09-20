"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberEditComponent = void 0;
var core_1 = require("@angular/core");
var angular_jwt_1 = require("@auth0/angular-jwt");
var MemberEditComponent = /** @class */ (function () {
    function MemberEditComponent(route, authService, alertify, userService) {
        this.route = route;
        this.authService = authService;
        this.alertify = alertify;
        this.userService = userService;
        this.helper = new angular_jwt_1.JwtHelperService();
    }
    MemberEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            // console.log(data);
            _this.user = data['user'].result;
        });
        this.authService.currentPhotoUrl.subscribe(function (photoUrl) { return (_this.photoUrl = photoUrl); });
    };
    MemberEditComponent.prototype.updateUser = function () {
        var _this = this;
        this.userToken = localStorage.getItem('token');
        this.decodedToken = this.helper.decodeToken(this.userToken);
        this.userService.updateUser(this.decodedToken.nameid, this.user).subscribe(function (next) {
            // console.log(this.user);
            _this.alertify.success('Profile Updated Successfully');
            _this.editForm.reset(_this.user);
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    MemberEditComponent.prototype.UpdateMainPhoto = function (photourl) {
        this.user.photoUrl = photourl;
    };
    __decorate([
        core_1.ViewChild('editForm')
    ], MemberEditComponent.prototype, "editForm");
    MemberEditComponent = __decorate([
        core_1.Component({
            selector: 'app-member-edit',
            templateUrl: './member-edit.component.html',
            styleUrls: ['./member-edit.component.scss']
        })
    ], MemberEditComponent);
    return MemberEditComponent;
}());
exports.MemberEditComponent = MemberEditComponent;
