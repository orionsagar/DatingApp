"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = exports.tokenGetter = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var tabs_1 = require("ngx-bootstrap/tabs");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var value_component_1 = require("./value/value.component");
var nav_component_1 = require("./nav/nav.component");
var forms_1 = require("@angular/forms");
var auth_service_1 = require("./_services/auth.service");
var login_component_1 = require("./login/login.component");
var home_component_1 = require("./home/home.component");
var register_component_1 = require("./register/register.component");
var alertify_service_1 = require("./_services/alertify.service");
var angular_jwt_1 = require("@auth0/angular-jwt");
var member_list_component_1 = require("./members/member-list/member-list.component");
var list_component_1 = require("./list/list.component");
var messages_component_1 = require("./messages/messages.component");
var NoPageFound_component_1 = require("./NoPageFound/NoPageFound.component");
var auth_guard_1 = require("./_guards/auth.guard");
var user_service_1 = require("./_services/user.service");
var member_cards_component_1 = require("./members/member-cards/member-cards.component");
var auth_module_1 = require("./auth/auth.module");
var member_details_component_1 = require("./members/member-details/member-details.component");
var member_details_resolvers_1 = require("./_resolvers/member-details.resolvers");
var member_list_resolvers_1 = require("./_resolvers/member-list.resolvers");
var ngx_gallery_1 = require("@kolkov/ngx-gallery");
var member_edit_component_1 = require("./members/member-edit/member-edit.component");
var member_edit_resolvers_1 = require("./_resolvers/member-edit.resolvers");
var prevent_unsave_changes_guard_1 = require("./_guards/prevent-unsave-changes.guard");
var photo_editor_component_1 = require("./members/photo-editor/photo-editor.component");
var ng2_file_upload_1 = require("ng2-file-upload");
var common_1 = require("@angular/common");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var animations_1 = require("@angular/platform-browser/animations");
var ngx_timeago_1 = require("ngx-timeago");
var pagination_1 = require("ngx-bootstrap/pagination");
var buttons_1 = require("ngx-bootstrap/buttons");
var lists_resolvers_1 = require("./_resolvers/lists.resolvers");
var message_resolvers_1 = require("./_resolvers/message.resolvers");
var member_messages_component_1 = require("./members/member-messages/member-messages.component");
var error_interceptor_1 = require("./_services/error.interceptor");
// tslint:disable-next-line:typedef
// export function authHttpServiceFactory(http: HttpClient) {
//   return new AuthHttp(new AuthConfig({
//     tokenName: 'token',
//     tokenGetter: (() => localStorage.getItem('token')),
//     globalHeaders: [{'Content-Type': 'application/json'}],
//   }), http);
// }
// tslint:disable-next-line:typedef
function tokenGetter() {
    return localStorage.getItem('token');
}
exports.tokenGetter = tokenGetter;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                nav_component_1.NavComponent,
                value_component_1.ValueComponent,
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                register_component_1.RegisterComponent,
                member_list_component_1.MemberListComponent,
                member_cards_component_1.MemberCardsComponent,
                list_component_1.ListComponent,
                messages_component_1.MessagesComponent,
                NoPageFound_component_1.NoPageFoundComponent,
                member_details_component_1.MemberDetailsComponent,
                member_edit_component_1.MemberEditComponent,
                photo_editor_component_1.PhotoEditorComponent,
                member_messages_component_1.MemberMessagesComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                angular_jwt_1.JwtModule.forRoot({
                    config: {
                        tokenGetter: tokenGetter,
                        allowedDomains: ['localhost:12532'],
                        disallowedRoutes: ['']
                    }
                }),
                auth_module_1.AuthModule,
                tabs_1.TabsModule.forRoot(),
                ngx_gallery_1.NgxGalleryModule,
                ng2_file_upload_1.FileUploadModule,
                animations_1.BrowserAnimationsModule,
                datepicker_1.BsDatepickerModule.forRoot(),
                ngx_timeago_1.TimeagoModule.forRoot(),
                pagination_1.PaginationModule.forRoot(),
                buttons_1.ButtonsModule.forRoot()
            ],
            providers: [
                auth_service_1.AuthService,
                alertify_service_1.AlertifyService,
                auth_guard_1.AuthGuard,
                user_service_1.UserService,
                member_details_resolvers_1.MemberDetailsResolver,
                member_list_resolvers_1.MemberListResolver,
                member_edit_resolvers_1.MemberEditResolver,
                prevent_unsave_changes_guard_1.PreventUnsaveChanges,
                lists_resolvers_1.ListResolver,
                message_resolvers_1.MessagesResolver,
                error_interceptor_1.ErrorInterceptorProvider
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
