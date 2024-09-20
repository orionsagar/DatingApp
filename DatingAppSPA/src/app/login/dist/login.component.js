"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(authService, alertify, router) {
        this.authService = authService;
        this.alertify = alertify;
        this.router = router;
        this.title = 'DatingAppSPA';
        this.CancelLog = new core_1.EventEmitter();
        this.model = {};
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.login = function () {
        var _this = this;
        // console.log(this.model);
        this.authService.login(this.model).subscribe(function (data) {
            // console.log('logged in successfully' + data);
            _this.alertify.success('logged in successfully');
        }, function (error) {
            // console.log(error);
            _this.alertify.error('Failed to login');
        }, function () {
            _this.router.navigate(['/members']);
        });
    };
    LoginComponent.prototype.logout = function () {
        this.authService.userToken = null;
        localStorage.removeItem('token');
        this.alertify.success('logged out');
        this.router.navigate(['/home']);
    };
    // tslint:disable-next-line:typedef
    LoginComponent.prototype.loggedIn = function () {
        // const token = localStorage.getItem('token');
        // return !!token;
        return this.authService.loggedIn();
    };
    LoginComponent.prototype.cancel = function () {
        this.CancelLog.emit(false);
        // console.log('Cancel');
    };
    __decorate([
        core_1.Input()
    ], LoginComponent.prototype, "valueLogFromHome");
    __decorate([
        core_1.Output()
    ], LoginComponent.prototype, "CancelLog");
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
