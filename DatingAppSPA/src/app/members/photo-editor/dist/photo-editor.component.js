"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PhotoEditorComponent = void 0;
var core_1 = require("@angular/core");
var ng2_file_upload_1 = require("ng2-file-upload");
var environment_prod_1 = require("src/environments/environment.prod");
var angular_jwt_1 = require("@auth0/angular-jwt");
var _ = require("underscore");
var PhotoEditorComponent = /** @class */ (function () {
    function PhotoEditorComponent(authService, userService, alertify) {
        this.authService = authService;
        this.userService = userService;
        this.alertify = alertify;
        this.baseUrl = environment_prod_1.environment.apiUrl;
        this.helper = new angular_jwt_1.JwtHelperService();
        this.getMemberPhotoChange = new core_1.EventEmitter();
        // this.uploader.onBeforeUploadItem = (item) => {
        //   item.withCredentials = false;
        // };
    }
    PhotoEditorComponent.prototype.ngOnInit = function () {
        this.initializeUploader();
    };
    PhotoEditorComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    PhotoEditorComponent.prototype.initializeUploader = function () {
        var _this = this;
        this.userToken = localStorage.getItem('token');
        this.decodedToken = this.helper.decodeToken(this.userToken);
        this.uploader = new ng2_file_upload_1.FileUploader({
            url: this.baseUrl + 'users/' + this.decodedToken.nameid + '/photos',
            isHTML5: true,
            itemAlias: 'File',
            disableMultipart: true,
            authToken: 'Bearer ' + this.userToken,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024
        });
        // console.log(this.uploader);
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            if (response) {
                var res = JSON.parse(response);
                var photo = {
                    id: res.id,
                    url: res.url,
                    dateAdded: res.dateAdded,
                    description: res.description,
                    isMain: res.isMain
                };
                _this.photos.push(photo);
                if (photo.isMain) {
                    _this.authService.changeMemberPhoto(photo.url);
                    _this.authService.currentUser.photoUrl = photo.url;
                    localStorage.setItem('user', JSON.stringify(_this.authService.currentUser));
                }
            }
        };
    };
    PhotoEditorComponent.prototype.setMainPhoto = function (photo) {
        var _this = this;
        this.userToken = localStorage.getItem('token');
        this.decodedToken = this.helper.decodeToken(this.userToken);
        this.userService.setMainPhoto(this.decodedToken.nameid, photo.id).subscribe(function () {
            _this.currentMain = _.findWhere(_this.photos, { isMain: true });
            _this.currentMain.isMain = false;
            photo.isMain = true;
            // this.getMemberPhotoChange.emit(photo.url);
            _this.authService.changeMemberPhoto(photo.url);
            _this.authService.currentUser.photoUrl = photo.url;
            localStorage.setItem('user', JSON.stringify(_this.authService.currentUser));
            _this.alertify.success('successfully set to main');
        }, function (error) {
            _this.alertify.error(error);
        });
    };
    PhotoEditorComponent.prototype.deletePhoto = function (id) {
        var _this = this;
        this.alertify.confirm('Are you sure you want to delete this photo', function () {
            _this.userService
                .deletePhoto(_this.authService.decodedToken.nameid, id)
                .subscribe(function () {
                _this.photos.splice(_.findIndex(_this.photos, { id: id }), 1);
                _this.alertify.success('Photo has been deleted');
            }, function (error) {
                _this.alertify.error('Failed to delete photo');
            });
        });
    };
    __decorate([
        core_1.Input()
    ], PhotoEditorComponent.prototype, "photos");
    __decorate([
        core_1.Output()
    ], PhotoEditorComponent.prototype, "getMemberPhotoChange");
    PhotoEditorComponent = __decorate([
        core_1.Component({
            selector: 'app-photo-editor',
            templateUrl: './photo-editor.component.html',
            styleUrls: ['./photo-editor.component.scss']
        })
    ], PhotoEditorComponent);
    return PhotoEditorComponent;
}());
exports.PhotoEditorComponent = PhotoEditorComponent;
