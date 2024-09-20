import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  title = 'DatingAppSPA';

  @Input() valueLogFromHome: any;
  @Output() CancelLog = new EventEmitter();

  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  login(): void {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(
      (data) => {
        // console.log('logged in successfully' + data);
        this.alertify.success('logged in successfully');
      },
      (error) => {
        // console.log(error);
        this.alertify.error('Failed to login');
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  logout(): void {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.success('logged out');
    this.router.navigate(['/home']);
  }

  // tslint:disable-next-line:typedef
  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.loggedIn();
  }

  cancel(): void {
    this.CancelLog.emit(false);
    // console.log('Cancel');
  }
}
