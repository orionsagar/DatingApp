"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.AppRoutingModule = void 0;

var core_1 = require("@angular/core");

var router_1 = require("@angular/router");

var home_component_1 = require("./home/home.component");

var list_component_1 = require("./list/list.component");

var login_component_1 = require("./login/login.component");

var member_details_component_1 = require("./members/member-details/member-details.component");

var member_edit_component_1 = require("./members/member-edit/member-edit.component");

var member_list_component_1 = require("./members/member-list/member-list.component");

var messages_component_1 = require("./messages/messages.component");

var NoPageFound_component_1 = require("./NoPageFound/NoPageFound.component");

var register_component_1 = require("./register/register.component");

var auth_guard_1 = require("./_guards/auth.guard");

var prevent_unsave_changes_guard_1 = require("./_guards/prevent-unsave-changes.guard");

var member_details_resolvers_1 = require("./_resolvers/member-details.resolvers");

var member_edit_resolvers_1 = require("./_resolvers/member-edit.resolvers");

var member_list_resolvers_1 = require("./_resolvers/member-list.resolvers");

var routes = [{
  path: 'login',
  component: login_component_1.LoginComponent
}, {
  path: 'register',
  component: register_component_1.RegisterComponent
}, {
  path: 'home',
  component: home_component_1.HomeComponent
}, {
  path: '',
  runGuardsAndResolvers: 'always',
  canActivate: [auth_guard_1.AuthGuard],
  children: [{
    path: 'members',
    component: member_list_component_1.MemberListComponent,
    resolve: {
      users: member_list_resolvers_1.MemberListResolver
    }
  }, {
    path: 'members/:id',
    component: member_details_component_1.MemberDetailsComponent,
    resolve: {
      user: member_details_resolvers_1.MemberDetailsResolver
    }
  }, {
    path: 'member/edit',
    component: member_edit_component_1.MemberEditComponent,
    resolve: {
      user: member_edit_resolvers_1.MemberEditResolver
    },
    canDeactivate: [prevent_unsave_changes_guard_1.PreventUnsaveChanges]
  }, {
    path: 'messages',
    component: messages_component_1.MessagesComponent
  }, {
    path: 'lists',
    component: list_component_1.ListComponent
  }]
}, {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}, {
  path: '**',
  component: NoPageFound_component_1.NoPageFoundComponent
}];

var AppRoutingModule =
/** @class */
function () {
  function AppRoutingModule() {}

  AppRoutingModule = __decorate([core_1.NgModule({
    imports: [router_1.RouterModule.forRoot(routes)],
    exports: [router_1.RouterModule]
  })], AppRoutingModule);
  return AppRoutingModule;
}();

exports.AppRoutingModule = AppRoutingModule;