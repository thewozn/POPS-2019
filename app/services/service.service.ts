import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { GlobalService } from '../services/global.service';

import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  serviceSubject = new Subject<Service[]>();
  private service: Service[] = [];

  constructor(private httpclient: HttpClient, private globalService: GlobalService) { }

  emitServicesSubject() {
    if (this.service != null) {
      this.serviceSubject.next(this.service.slice());
    }
  }

  getServicesFromServer() {
    this.httpclient.get<Service[]>(this.globalService.getbaseUrl() + '/getServiceList').subscribe(
      (response) => {
        this.service = response;
        this.emitServicesSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  addServiceServer(service: Service) {
    this.httpclient.post<Service>(this.globalService.getbaseUrl() + '/createService', JSON.stringify(service),
    this.globalService.gethttpOptions()).subscribe(
      (response) => {
        console.log(response);
        this.emitServicesSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
      }
    );
  }

  modifServiceServer(service: Service) {
    this.httpclient.patch<Service>(this.globalService.getbaseUrl() + '/updateUser', JSON.stringify(service),
    this.globalService.gethttpOptions()).subscribe(
      (response) => {
        console.log(response);
        this.emitServicesSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error.message);
      }
    );
  }
}
