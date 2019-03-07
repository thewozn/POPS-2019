import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../services/global.service';

import { Service } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private httpclient: HttpClient, private globalService: GlobalService) { }

  getServiceById(service: Service[], id: number) {
    const s = service.find(
      (res) => {
        return res.sid === id;
      }
    );
    return s;
  }

  async getServiceByIdFromServer(id: number) {
    return await this.httpclient.get<Service>(this.globalService.getbaseUrl() + '/getServiceBySID/' + id).toPromise();
  }

  async getServicesFromServer() {
    return await this.httpclient.get<Service[]>(this.globalService.getbaseUrl() + '/getServiceList').toPromise();
  }

   async addServiceFromServer(service: Service) {
    await this.httpclient.post<Service>(this.globalService.getbaseUrl() + '/createService', JSON.stringify(service),
    this.globalService.gethttpOptions()).toPromise();
  }

  async updateServiceFromServer(service: Service) {
    await this.httpclient.patch<Service>(this.globalService.getbaseUrl() + '/updateService', JSON.stringify(service),
    this.globalService.gethttpOptions()).toPromise();
  }
}
