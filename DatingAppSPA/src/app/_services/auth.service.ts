import { Injectable } from '@angular/core';
import { catchError, map, retry } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import 'url-polyfill';
// import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { LoginResponse } from '../_models/LoginResponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //baseurl = 'https://localhost:5001/api/auth';

  baseurl = environment.apiUrl;
  userToken: any;
  decodedToken: any;
  currentUser: User;
  helper = new JwtHelperService();
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // Verify user credentials on server to get token
  login(model: any): Observable<any> {
    // const options = new HttpHeaders {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };

    // this.http.post<User>(this.baseurl + '/login', model).subscribe(data => {
    //     this.userToken = data.tokenString;
    // });

    // const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    // const body = { title: 'Angular POST Request Example' };

    const headers = {
      'Content-type': 'application/json',
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
      .post<any>(this.baseurl + 'auth/login', model, { headers })
      .pipe(
        map((res) => {
          const user = res;
          if (user && user.tokenString) {
            localStorage.setItem('token', user.tokenString);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.userToken = res.tokenString;
            this.decodedToken = this.helper.decodeToken(this.userToken);
            this.currentUser = user.user;
            this.userToken = user.tokenString;
            if (this.currentUser.photoUrl !== null) {
              this.changeMemberPhoto(this.currentUser.photoUrl);
            } else {
              this.changeMemberPhoto('../../assets/user.png');
            }

            // console.log(this.decodedToken);
          }
        })
      );

    // return this.http.post<User>(this.baseurl + '/login', model).map((response: Response)=>{
    //     const user = response;
    //     if(user) {
    //       localStorage.setItem('token', user.);
    //       this.userToken = user.tokenString;
    //     }
    // });
  }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  // Second verify user credentials
  loginform(data): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.baseurl + 'auth/login', data, this.httpOptions);
  }

  // tslint:disable-next-line:typedef
  // register(model: any) {
  //   const headers = { 'Content-type': 'application/json' };
  //   return this.http
  //     .post(this.baseurl + '/register', model, { headers })
  //     .pipe(catchError(this.handleError));
  // }

  // tslint:disable-next-line:typedef
  register(user: User) {
    const headers = { 'Content-type': 'application/json' };
    return this.http
      .post(this.baseurl + 'auth/register', user, { headers });
  }

  // tslint:disable-next-line:typedef
  loggedIn() {
    //return tokenNotExpired('token');
    return localStorage.getItem('token');
  }












  
  /// Handle API error one
  // tslint:disable-next-line:typedef
  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return throwError(applicationError);
    }

    const serverError = error;
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return throwError(modelStateErrors || 'Server error');
  }

  /// Handle API errors two
  // tslint:disable-next-line:typedef
  newhandleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  // Handle API errors three
  // tslint:disable-next-line:typedef
  threehandleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}

export interface userToken {
  tokenString: string;
}
