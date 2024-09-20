"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(http) {
        this.http = http;
        this.title = 'DatingAppSPA';
        this.loginMode = false;
        this.registerMode = false;
        this.displayMode = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.getValues();
    };
    HomeComponent.prototype.registerToggle = function () {
        //this.registerMode = true;
        this.displayMode = true;
    };
    HomeComponent.prototype.loginToggle = function () {
        this.loginMode = true;
        //this.displayMode = true;
        // console.log('logintoggle');
    };
    HomeComponent.prototype.getValues = function () {
        var _this = this;
        this.http.get(environment_1.environment.apiUrl + 'Values').subscribe(function (response) {
            _this.values = response;
        });
    };
    HomeComponent.prototype.cancelRegisterMode = function (displayMode) {
        this.displayMode = displayMode;
    };
    HomeComponent.prototype.cancelLogMode = function (loginMode) {
        this.loginMode = loginMode;
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.scss']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
