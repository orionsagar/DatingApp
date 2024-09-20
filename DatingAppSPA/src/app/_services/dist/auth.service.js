"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/common/http");
require("url-polyfill");
// import { Observable } from 'rxjs/internal/Observable';
var rxjs_1 = require("rxjs");
var angular_jwt_1 = require("@auth0/angular-jwt");
var environment_1 = require("src/environments/environment");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        //baseurl = 'https://localhost:5001/api/auth';
        this.baseurl = environment_1.environment.apiUrl;
        this.helper = new angular_jwt_1.JwtHelperService();
        this.photoUrl = new rxjs_1.BehaviorSubject('../../assets/user.png');
        this.currentPhotoUrl = this.photoUrl.asObservable();
        // Http Options
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }
    // Verify user credentials on server to get token
    AuthService.prototype.login = function (model) {
        // const options = new HttpHeaders {
        //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        // };
        var _this = this;
        // this.http.post<User>(this.baseurl + '/login', model).subscribe(data => {
        //     this.userToken = data.tokenString;
        // });
        // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
        // const body = { title: 'Angular POST Request Example' };
        var headers = {
            'Content-type': 'application/json'
        };
        // return this.http
        //   .post<any>(this.baseurl + '/login', model, { headers })
        //   .subscribe((data) => {
        //     const user = data;
        //     if (user) {
        //       localStorage.setItem('token', user.tokenString);
        //       this.userToken = data.tokenString;
        //     }
        //   });
        return this.http
            .post(this.baseurl + 'auth/login', model, { headers: headers })
            .pipe(operators_1.map(function (res) {
            var user = res;
            if (user && user.tokenString) {
                localStorage.setItem('token', user.tokenString);
                localStorage.setItem('user', JSON.stringify(user.user));
                _this.userToken = res.tokenString;
                _this.decodedToken = _this.helper.decodeToken(_this.userToken);
                _this.currentUser = user.user;
                _this.userToken = user.tokenString;
                if (_this.currentUser.photoUrl !== null) {
                    _this.changeMemberPhoto(_this.currentUser.photoUrl);
                }
                else {
                    _this.changeMemberPhoto('../../assets/user.png');
                }
                // console.log(this.decodedToken);
            }
        }));
        // return this.http.post<User>(this.baseurl + '/login', model).map((response: Response)=>{
        //     const user = response;
        //     if(user) {
        //       localStorage.setItem('token', user.);
        //       this.userToken = user.tokenString;
        //     }
        // });
    };
    AuthService.prototype.changeMemberPhoto = function (photoUrl) {
        this.photoUrl.next(photoUrl);
    };
    // Second verify user credentials
    AuthService.prototype.loginform = function (data) {
        return this.http
            .post(this.baseurl + 'auth/login', data, this.httpOptions);
    };
    // tslint:disable-next-line:typedef
    // register(model: any) {
    //   const headers = { 'Content-type': 'application/json' };
    //   return this.http
    //     .post(this.baseurl + '/register', model, { headers })
    //     .pipe(catchError(this.handleError));
    // }
    // tslint:disable-next-line:typedef
    AuthService.prototype.register = function (user) {
        var headers = { 'Content-type': 'application/json' };
        return this.http
            .post(this.baseurl + 'auth/register', user, { headers: headers });
    };
    // tslint:disable-next-line:typedef
    AuthService.prototype.loggedIn = function () {
        //return tokenNotExpired('token');
        return localStorage.getItem('token');
    };
    /// Handle API error one
    // tslint:disable-next-line:typedef
    AuthService.prototype.handleError = function (error) {
        var applicationError = error.headers.get('Application-Error');
        if (applicationError) {
            return rxjs_1.throwError(applicationError);
        }
        var serverError = error;
        var modelStateErrors = '';
        if (serverError) {
            for (var key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        return rxjs_1.throwError(modelStateErrors || 'Server error');
    };
    /// Handle API errors two
    // tslint:disable-next-line:typedef
    AuthService.prototype.newhandleError = function (error) {
        var errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = "Error: " + error.error.message;
        }
        else {
            // server-side error
            errorMessage = "Error Code: " + error.status + "\nMessage: " + error.message;
        }
        console.log(errorMessage);
        return rxjs_1.throwError(errorMessage);
    };
    // Handle API errors three
    // tslint:disable-next-line:typedef
    AuthService.prototype.threehandleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " + ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return rxjs_1.throwError('Something bad happened; please try again later.');
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
