import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { TypeOfLeave } from '../models/type-of-leave.model';

@Injectable({
  providedIn: 'root'
})
export class TypeOfLeaveService {

  private baseUrl = '//localhost:8080';
  tolsSubject = new Subject<TypeOfLeave[]>();
  private tols: TypeOfLeave[] = [];

  constructor(private httpclient: HttpClient) { }

  emitUsersSubject() {
    if (this.tols != null) {
      this.tolsSubject.next(this.tols.slice());
    }
  }

  // TODO : changez l'url "users" à ce qui correspond au ligne de note de frais
  // getAll(): Observable<TypeOfLeave[]> {
  //   return this.httpclient.get<TypeOfLeave[]>(this.baseUrl + '/users');
  // }
}
