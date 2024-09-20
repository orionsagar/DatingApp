import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, of } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Message } from '../_models/message';
import { IPagedResults, PaginatedResult } from '../_models/Pagination';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.apiUrl;
  public userArray: User[];

  constructor(private http: HttpClient) {}

  getUsers(
    page?: number,
    itemsPerPage?: number,
    userParams?: any,
    likesParams?: string
  ): Observable<PaginatedResult<User[]>> {
    let queryString = '?';

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

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http
      .get(this.baseUrl + 'user' + queryString, {
        headers: headers,
        observe: 'response',
      })
      .pipe(
        map((res) => {
          const totalRecords = JSON.parse(res.headers.get('Pagination'));
          const users = res.body as User[];
          const presult = new PaginatedResult<User[]>();
          presult.result = users;

          if (totalRecords !== null) {
            presult.pagination = totalRecords;
          }
          // console.log(presult);
          return presult;
        })
      );
  }

  getUsersPage(
    page?: number,
    itemsPerPage?: number
  ): Observable<IPagedResults<User[]>> {
    let queryString = '?';

    if (page !== null && itemsPerPage !== null) {
      queryString += 'pagenumber=' + page + '&pagesize=' + itemsPerPage;
    }

    return this.http
      .get<User[]>(this.baseUrl + 'user' + queryString, { observe: 'response' })
      .pipe(
        map((res) => {
          const totalRecords = res.headers.get('Pagination');
          const users = res.body as User[];
          return {
            results: users,
            totalRecords: totalRecords,
          };
        })
      );
  }

  // getUsers(): Observable<User[]> {
  //   return this.http
  //     .get(this.baseUrl + 'user', this.jwt())
  //     .pipe(
  //       map((response) => response as User[], catchError(this.threehandleError))
  //     );
  // }

  getUser(id: string): Observable<User> {
    return this.http
      .get(this.baseUrl + 'user/' + id, this.jwt())
      .pipe(
        map((response) => response as User)
      );
  }

  updateUser(id: number, user: User) {
    return this.http
      .put(this.baseUrl + 'user/' + id, user, this.jwt())
      .pipe(map((response) => response));
  }

  setMainPhoto(userId: number, id: number) {
    return this.http
      .post(
        this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain',
        {},
        this.jwt()
      );
  }

  deletePhoto(userId: number, id: number) {
    return this.http
      .delete(this.baseUrl + 'users/' + userId + '/photos/' + id, this.jwt());
  }

  sendLike(Id: number, recipientId: number) {
    return this.http
      .post(
        this.baseUrl + 'user/' + Id + '/like/' + recipientId,
        {},
        this.jwt()
      );
  }

  getMessages(
    id: number,
    page?: number,
    itemsPerPage?: number,
    messageContainer?: string
  ) {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<
      Message[]
    >();
    let queryString = '?MessageContainer=' + messageContainer;

    if (page != null && itemsPerPage != null) {
      queryString += '&pageNumber=' + page + '&pageSize=' + itemsPerPage;
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http
      .get(this.baseUrl + 'users/' + id + '/message' + queryString, {
        headers: headers,
        observe: 'response',
      })
      .pipe(
        map((res) => {
          const totalRecords = JSON.parse(res.headers.get('Pagination'));
          const messages = res.body as Message[];
          const presult = new PaginatedResult<Message[]>();
          presult.result = messages;

          if (totalRecords !== null) {
            presult.pagination = totalRecords;
          }
          // console.log(presult);
          return presult;
        })
      );
  }

  getMessageThread(id: number, recipientId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http
      .get(this.baseUrl + 'users/' + id + '/message/thread/' + recipientId, {
        headers: headers,
      })
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  sendMessages(id: number, messages: Message) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http
      .post(this.baseUrl + 'users/' + id + '/message', messages, {
        headers: headers,
      })
      .pipe(
        map((response: Response) => {
          return response;
        })
      );
  }

  deleteMessage(id: number, userId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http
      .post(this.baseUrl + 'users/' + userId + '/message/' + id, {}, this.jwt());
  }

  markAsRead(userId: number, messageId: number) {
    return this.http
      .post(
        this.baseUrl + 'users/' + userId + '/message/' + messageId + '/read',
        {},
        this.jwt()
      )
      .subscribe();
  }

  // tslint:disable-next-line:typedef
  private jwt() {
    const token = localStorage.getItem('token');
    if (token) {
      // let headers = new headers({ Authorization: 'Bearer ' + token });
      const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
      headers.set('Content-Type', 'application/json; charset=utf-8');
      const options = {
        headers,
      };
      return options;
    }
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

    if (error.status === 400) {
      return throwError(error.error);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }
}
