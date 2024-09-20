import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { from } from 'rxjs';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListComponent } from './list/list.component';
import { MessagesComponent } from './messages/messages.component';
import { NoPageFoundComponent } from './NoPageFound/NoPageFound.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberCardsComponent } from './members/member-cards/member-cards.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome/dist/src/angular-font-awesome.module';
import { AuthModule } from './auth/auth.module';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberDetailsResolver } from './_resolvers/member-details.resolvers';
import { MemberListResolver } from './_resolvers/member-list.resolvers';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolvers';
import { PreventUnsaveChanges } from './_guards/prevent-unsave-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeagoModule } from 'ngx-timeago';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ListResolver } from './_resolvers/lists.resolvers';
import { MessagesResolver } from './_resolvers/message.resolvers';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';

// tslint:disable-next-line:typedef
// export function authHttpServiceFactory(http: HttpClient) {
//   return new AuthHttp(new AuthConfig({
//     tokenName: 'token',
//     tokenGetter: (() => localStorage.getItem('token')),
//     globalHeaders: [{'Content-Type': 'application/json'}],
//   }), http);
// }

// tslint:disable-next-line:typedef
export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ValueComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberCardsComponent,
    ListComponent,
    MessagesComponent,
    NoPageFoundComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    MemberMessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:12532'],
        disallowedRoutes: [''],
      },
    }),
    AuthModule,
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TimeagoModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailsResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsaveChanges,
    ListResolver,
    MessagesResolver,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
