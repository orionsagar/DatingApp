"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavComponent = void 0;
var core_1 = require("@angular/core");
var angular_jwt_1 = require("@auth0/angular-jwt");
var NavComponent = /** @class */ (function () {
    function NavComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.helper = new angular_jwt_1.JwtHelperService();
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loggedIn();
        this.authService.currentPhotoUrl.subscribe(function (photoUrl) { return (_this.photoUrl = photoUrl); });
    };
    NavComponent.prototype.logout = function () {
        this.authService.userToken = null;
        this.authService.currentUser = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log('logged out');
        this.router.navigate(['/home']);
    };
    // tslint:disable-next-line:typedef
    NavComponent.prototype.loggedIn = function () {
        var _a;
        // const token = localStorage.getItem('token');
        // return !!token;
        // console.log(this.helper.decodeToken(localStorage.getItem('token')));
        this.deToken = this.helper.decodeToken(localStorage.getItem('token'));
        this.username = (_a = this.deToken) === null || _a === void 0 ? void 0 : _a.unique_name;
        return this.authService.loggedIn();
    };
    NavComponent = __decorate([
        core_1.Component({
            selector: 'app-nav',
            templateUrl: './nav.component.html',
            styleUrls: ['./nav.component.css']
        })
    ], NavComponent);
    return NavComponent;
}());
exports.NavComponent = NavComponent;
