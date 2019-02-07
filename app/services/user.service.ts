import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  private baseUrl = '//localhost:8080';
  usersSubject = new Subject<User[]>();
  private users: User[] = [];

  constructor(private httpclient: HttpClient) {}

  emitUsersSubject() {
    if (this.users != null) {
      this.usersSubject.next(this.users.slice());
    }
  }

  getAll(): Observable<User[]> {
   return this.httpclient.get<User[]>(this.baseUrl + '/users');
  // .subscribe(
  //     response => {
  //       console.log(this.users);
  //       this.users = response;
  //       this.emitUsersSubject();
  //     },
  //     error => {
  //       console.log('Erreur ! : ' + error);
  //     }
  //   );
  }
}

