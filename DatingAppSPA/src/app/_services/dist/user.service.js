"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_prod_1 = require("src/environments/environment.prod");
var Pagination_1 = require("../_models/Pagination");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.baseUrl = environment_prod_1.environment.apiUrl;
    }
    UserService.prototype.getUsers = function (page, itemsPerPage, userParams, likesParams) {
        var queryString = '?';
        if (page !== null && itemsPerPage !== null) {
            queryString += 'pagenumber=' + page + '&pagesize=' + itemsPerPage + '&';
        }
        if (userParams != null) {
            queryString +=
                'minage=' +
                    userParams.MinAge +
                    '&maxage=' +
                    userParams.MaxAge +
                    '&gender=' +
                    userParams.gender +
                    '&orderby=' +
                    userParams.orderBy;
        }
        if (likesParams === 'Likers') {
            queryString += 'Likers=true&';
        }
        if (likesParams === 'Likees') {
            queryString += 'Likees=true&';
        }
        var token = localStorage.getItem('token');
        var headers = new http_1.HttpHeaders({ Authorization: 'Bearer ' + token });
        headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http
            .get(this.baseUrl + 'user' + queryString, {
            headers: headers,
            observe: 'response'
        })
            .pipe(operators_1.map(function (res) {
            var totalRecords = JSON.parse(res.headers.get('Pagination'));
            var users = res.body;
            var presult = new Pagination_1.PaginatedResult();
            presult.result = users;
            if (totalRecords !== null) {
                presult.pagination = totalRecords;
            }
            // console.log(presult);
            return presult;
        }));
    };
    UserService.prototype.getUsersPage = function (page, itemsPerPage) {
        var queryString = '?';
        if (page !== null && itemsPerPage !== null) {
            queryString += 'pagenumber=' + page + '&pagesize=' + itemsPerPage;
        }
        return this.http
            .get(this.baseUrl + 'user' + queryString, { observe: 'response' })
            .pipe(operators_1.map(function (res) {
            var totalRecords = res.headers.get('Pagination');
            var users = res.body;
            return {
                results: users,
                totalRecords: totalRecords
            };
        }));
    };
    // getUsers(): Observable<User[]> {
    //   return this.http
    //     .get(this.baseUrl + 'user', this.jwt())
    //     .pipe(
    //       map((response) => response as User[], catchError(this.threehandleError))
    //     );
    // }
    UserService.prototype.getUser = function (id) {
        return this.http
            .get(this.baseUrl + 'user/' + id, this.jwt())
            .pipe(operators_1.map(function (response) { return response; }));
    };
    UserService.prototype.updateUser = function (id, user) {
        return this.http
            .put(this.baseUrl + 'user/' + id, user, this.jwt())
            .pipe(operators_1.map(function (response) { return response; }));
    };
    UserService.prototype.setMainPhoto = function (userId, id) {
        return this.http
            .post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {}, this.jwt());
    };
    UserService.prototype.deletePhoto = function (userId, id) {
        return this.http["delete"](this.baseUrl + 'users/' + userId + '/photos/' + id, this.jwt());
    };
    UserService.prototype.sendLike = function (Id, recipientId) {
        return this.http
            .post(this.baseUrl + 'user/' + Id + '/like/' + recipientId, {}, this.jwt());
    };
    UserService.prototype.getMessages = function (id, page, itemsPerPage, messageContainer) {
        var paginatedResult = new Pagination_1.PaginatedResult();
        var queryString = '?MessageContainer=' + messageContainer;
        if (page != null && itemsPerPage != null) {
            queryString += '&pageNumber=' + page + '&pageSize=' + itemsPerPage;
        }
        var token = localStorage.getItem('token');
        var headers = new http_1.HttpHeaders({ Authorization: 'Bearer ' + token });
        headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http
            .get(this.baseUrl + 'users/' + id + '/message' + queryString, {
            headers: headers,
            observe: 'response'
        })
            .pipe(operators_1.map(function (res) {
            var totalRecords = JSON.parse(res.headers.get('Pagination'));
            var messages = res.body;
            var presult = new Pagination_1.PaginatedResult();
            presult.result = messages;
            if (totalRecords !== null) {
                presult.pagination = totalRecords;
            }
            // console.log(presult);
            return presult;
        }));
    };
    UserService.prototype.getMessageThread = function (id, recipientId) {
        var token = localStorage.getItem('token');
        var headers = new http_1.HttpHeaders({ Authorization: 'Bearer ' + token });
        headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http
            .get(this.baseUrl + 'users/' + id + '/message/thread/' + recipientId, {
            headers: headers
        })
            .pipe(operators_1.map(function (response) {
            return response;
        }));
    };
    UserService.prototype.sendMessages = function (id, messages) {
        var token = localStorage.getItem('token');
        var headers = new http_1.HttpHeaders({ Authorization: 'Bearer ' + token });
        headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http
            .post(this.baseUrl + 'users/' + id + '/message', messages, {
            headers: headers
        })
            .pipe(operators_1.map(function (response) {
            return response;
        }));
    };
    UserService.prototype.deleteMessage = function (id, userId) {
        var token = localStorage.getItem('token');
        var headers = new http_1.HttpHeaders({ Authorization: 'Bearer ' + token });
        headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http
            .post(this.baseUrl + 'users/' + userId + '/message/' + id, {}, this.jwt());
    };
    UserService.prototype.markAsRead = function (userId, messageId) {
        return this.http
            .post(this.baseUrl + 'users/' + userId + '/message/' + messageId + '/read', {}, this.jwt())
            .subscribe();
    };
    // tslint:disable-next-line:typedef
    UserService.prototype.jwt = function () {
        var token = localStorage.getItem('token');
        if (token) {
            // let headers = new headers({ Authorization: 'Bearer ' + token });
            var headers = new http_1.HttpHeaders({ Authorization: 'Bearer ' + token });
            headers.set('Content-Type', 'application/json; charset=utf-8');
            var options = {
                headers: headers
            };
            return options;
        }
    };
    // Handle API errors three
    // tslint:disable-next-line:typedef
    UserService.prototype.threehandleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " + ("body was: " + error.error));
        }
        if (error.status === 400) {
            return rxjs_1.throwError(error.error);
        }
        // return an observable with a user-facing error message
        return rxjs_1.throwError('Something bad happened; please try again later.');
    };
    UserService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            var errMessage = error.error.message;
            return rxjs_1.Observable["throw"](errMessage);
            // Use the following instead if using lite-server
            // return Observable.throw(err.text() || 'backend server error');
        }
        return rxjs_1.Observable["throw"](error || 'Node.js server error');
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
