import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  userSubject = new Subject<User[]>();
  private user: User[] = [];

  constructor(private httpclient: HttpClient, private globalService: GlobalService) {}

  emitUsersSubject() {
    if (this.user != null) {
      this.userSubject.next(this.user.slice());
    }
  }

  getUserById(id: number) {
    const u = this.user.find(
      (s) => {
        return s.uid === id;
      }
    );
    return u;
  }

  getUsersFromServer() {
    this.httpclient.get<User[]>(this.globalService.getbaseUrl() + '/getUserList').subscribe(
      (response) => {
        this.user = response;
        this.emitUsersSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  addUserServer(user: User) {
    this.httpclient.post<User>(this.globalService.getbaseUrl() + '/createUser', JSON.stringify(user),
    this.globalService.gethttpOptions()).subscribe(
      (response) => {
        console.log(response);
        this.getUsersFromServer();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
      }
    );
  }

  modifUserServer(user: User) {
    this.httpclient.patch<User>(this.globalService.getbaseUrl() + '/updateUser', JSON.stringify(user),
    this.globalService.gethttpOptions()).subscribe(
      (response) => {
        console.log(response);
        this.getUsersFromServer();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
      }
    );
  }
}

