import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Mission } from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  private baseUrl = '//localhost:8080';
  missionsSubject = new Subject<Mission[]>();
  private missions: Mission[] = [];

  constructor(private httpclient: HttpClient) { }

  emitUsersSubject() {
    if (this.missions != null) {
      this.missionsSubject.next(this.missions.slice());
    }
  }

  // TODO : changez l'url "users" à ce qui correspond au ligne de note de frais
  // getAll(): Observable<Mission[]> {
  //   return this.httpclient.get<Mission[]>(this.baseUrl + '/users');
  // }
}
