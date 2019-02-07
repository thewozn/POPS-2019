import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl = '//localhost:8080';
  servicesSubject = new Subject<Service[]>();
  private services: Service[] = [];

  constructor(private httpclient: HttpClient) { }

  emitUsersSubject() {
    if (this.services != null) {
      this.servicesSubject.next(this.services.slice());
    }
  }

  // TODO : changez l'url "users" à ce qui correspond au ligne de note de frais
  // getAll(): Observable<Service[]> {
  //   return this.httpclient.get<Service[]>(this.baseUrl + '/users');
  // }
}
