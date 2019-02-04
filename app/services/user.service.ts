import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Subject} from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://138.195.202.70:8080';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });
  UsersSubject = new Subject<User[]>();
  private users: User[] = [];

  constructor(private _http: Http) {}

  emitUsersSubject() {
    if (this.users != null) {
      this.UsersSubject.next(this.users.slice());
    }
  }

  // getUsersFromServer() {
  //   this.httpClient.get<User[]>('138.195.202.70:8080/users').subscribe(
  //     response => {
  //       this.users = response;
  //       this.emitUsersSubject();
  //     },
  //     error => {
  //       console.log('Erreur ! : ' + error);
  //     }
  //   );
  // }

  getUsers() {
    return this._http
      .get(this.baseUrl + '/users', this.options)
      .map((response: Response) => response.json)
      .catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    return Observable.throw(error || 'Server ERROR');
  }
}

