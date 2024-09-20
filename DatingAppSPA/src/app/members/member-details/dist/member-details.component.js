"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MemberDetailsComponent = void 0;
var core_1 = require("@angular/core");
var ngx_gallery_1 = require("@kolkov/ngx-gallery");
var MemberDetailsComponent = /** @class */ (function () {
    function MemberDetailsComponent(userServcie, alertify, router) {
        this.userServcie = userServcie;
        this.alertify = alertify;
        this.router = router;
    }
    MemberDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.data.subscribe(function (data) {
            _this.user = data.user;
        });
        this.router.queryParams.subscribe(function (params) {
            // console.log(params['tab']);
            if (params['tab'] != null) {
                //this.selectTab(params['tab']);
                _this.membertabs.tabs[params['tab']].active = true;
            }
        });
        this.galleryOptions = [
            {
                width: '600px',
                height: '400px',
                thumbnailsColumns: 4,
                imageAnimation: ngx_gallery_1.NgxGalleryAnimation.Slide,
                preview: false
            },
        ];
        this.galleryImages = this.getImages();
    };
    MemberDetailsComponent.prototype.ngAfterViewInit = function () {
        this.router.params.subscribe(function (params) {
            var selectTab = +params['tab'];
            // console.log('queryparams:' + selectTab);
            // this.membertabs.tabs[selectTab > 0 ? selectTab : 0].active = true;
        });
    };
    MemberDetailsComponent.prototype.getImages = function () {
        var imageUrls = [];
        for (var i = 0; i < this.user.photos.length; i++) {
            imageUrls.push({
                small: this.user.photos[i].url,
                medium: this.user.photos[i].url,
                big: this.user.photos[i].url
            });
        }
        // console.log(imageUrls);
        return imageUrls;
    };
    MemberDetailsComponent.prototype.selectTab = function (tabid) {
        this.membertabs.tabs[tabid].active = true;
    };
    __decorate([
        core_1.ViewChild('membertabs', { static: true })
    ], MemberDetailsComponent.prototype, "membertabs");
    MemberDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-member-details',
            templateUrl: './member-details.component.html',
            styleUrls: ['./member-details.component.scss']
        })
    ], MemberDetailsComponent);
    return MemberDetailsComponent;
}());
exports.MemberDetailsComponent = MemberDetailsComponent;
