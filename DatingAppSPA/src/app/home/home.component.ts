import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title = 'DatingAppSPA';
  values: any;

  loginMode = false;
  registerMode = false;
  displayMode = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getValues();
  }

  registerToggle(): void {
    //this.registerMode = true;
    this.displayMode = true;
  }

  loginToggle(): void {
    this.loginMode = true;
    //this.displayMode = true;
    // console.log('logintoggle');
  }

  getValues(): void {
    this.http.get(environment.apiUrl + 'Values').subscribe((response) => {
      this.values = response;
    });
  }

  cancelRegisterMode(displayMode: boolean): void {
    this.displayMode = displayMode;
  }

  cancelLogMode(loginMode: boolean): void {
    this.loginMode = loginMode;
  }
}
