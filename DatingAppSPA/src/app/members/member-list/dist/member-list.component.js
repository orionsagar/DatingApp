"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberListComponent = void 0;
var core_1 = require("@angular/core");
var MemberListComponent = /** @class */ (function () {
    function MemberListComponent(userService, alertify, router) {
        this.userService = userService;
        this.alertify = alertify;
        this.router = router;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.userParams = {};
        this.genderList = [
            { v: 'male', d: 'Male' },
            { v: 'female', d: 'Female' },
        ];
    }
    MemberListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.data.subscribe(function (data) {
            _this.users = data['users'].result;
            _this.pagination = data['users'].pagination;
        });
        this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
        this.userParams.MinAge = 18;
        this.userParams.MaxAge = 99;
        this.userParams.orderBy = 'LastActive';
    };
    MemberListComponent.prototype.loadUsers = function () {
        var _this = this;
        this.userService
            .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams, null)
            .subscribe(function (res) {
            _this.users = res.result;
            _this.pagination = res.pagination;
        }, function (error) {
            // console.log(error);
            _this.alertify.error(error);
        });
    };
    MemberListComponent.prototype.resetFilter = function () {
        this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
        this.userParams.MinAge = 18;
        this.userParams.MaxAge = 99;
        this.loadUsers();
    };
    MemberListComponent.prototype.pageChanged = function (event) {
        // console.log('Page changed to: ' + event.page);
        // console.log('Number items per page: ' + event.itemsPerPage);
        this.pagination.currentPage = event.page;
        this.loadUsers();
    };
    MemberListComponent = __decorate([
        core_1.Component({
            selector: 'app-member-list',
            templateUrl: './member-list.component.html',
            styleUrls: ['./member-list.component.css']
        })
    ], MemberListComponent);
    return MemberListComponent;
}());
exports.MemberListComponent = MemberListComponent;
