import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { UserMission } from '../models/user-mission.model';

@Injectable({
  providedIn: 'root'
})
export class Userumservice {

  private baseUrl = '//localhost:8080';
  umsSubject = new Subject<UserMission[]>();
  private ums: UserMission[] = [];

  constructor(private httpclient: HttpClient) { }

  emitUsersSubject() {
    if (this.ums != null) {
      this.umsSubject.next(this.ums.slice());
    }
  }

  // TODO : changez l'url "users" à ce qui correspond au ligne de note de frais
  // getAll(): Observable<UserMission[]> {
  //   return this.httpclient.get<UserMission[]>(this.baseUrl + '/users');
  // }
}
