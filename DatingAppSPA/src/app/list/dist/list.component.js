"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListComponent = void 0;
var core_1 = require("@angular/core");
var ListComponent = /** @class */ (function () {
    function ListComponent(userService, authService, alertify, route) {
        this.userService = userService;
        this.authService = authService;
        this.alertify = alertify;
        this.route = route;
        this.userParams = {};
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.data.subscribe(function (data) {
            _this.users = data['users'].result;
            _this.pagination = data['users'].pagination;
        });
        this.userParams.gender = 'female';
        this.userParams.MinAge = 18;
        this.userParams.MaxAge = 99;
        this.userParams.orderBy = 'LastActive';
        this.likeParams = 'Likers';
    };
    ListComponent.prototype.loadUsers = function () {
        var _this = this;
        this.userService
            .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams, this.likeParams)
            .subscribe(function (res) {
            _this.users = res.result;
            _this.pagination = res.pagination;
            // console.log('Test: ' + this.users);
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    ListComponent.prototype.pageChanged = function (event) {
        // console.log('Page changed to: ' + event.page);
        // console.log('Number items per page: ' + event.itemsPerPage);
        this.pagination.currentPage = event.page;
        this.loadUsers();
    };
    ListComponent = __decorate([
        core_1.Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css']
        })
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
