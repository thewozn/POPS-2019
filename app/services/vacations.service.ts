import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Vacations } from '../models/vacations.model';

@Injectable({
  providedIn: 'root'
})
export class VacationsService {

  private baseUrl = '//localhost:8080';
  vacationsSubject = new Subject<Vacations[]>();
  private vacations: Vacations[] = [];

  constructor(private httpclient: HttpClient) { }

  emitUsersSubject() {
    if (this.vacations != null) {
      this.vacationsSubject.next(this.vacations.slice());
    }
  }

  // TODO : changez l'url "users" à ce qui correspond au ligne de note de frais
  // getAll(): Observable<Vacations[]> {
  //   return this.httpclient.get<Vacations[]>(this.baseUrl + '/users');
  // }
}
