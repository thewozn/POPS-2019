import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../services/global.service';
import { ConnectedService } from './connected.service';
import { VacationRequest } from '../models/vacation-request.model';


@Injectable()
export class VacationRequestService {

  constructor(private connectedService: ConnectedService, private httpclient: HttpClient, private globalService: GlobalService) {
  }

  async getVacationRequestByDidFromServer(id: number) {
    return await this.httpclient.get<VacationRequest>(this.globalService.getbaseUrl() + '/getVacationRequestByDid/' + id).toPromise();
  }

  async getVacationRequestsListFromServer() {
    return await this.httpclient.get<VacationRequest[]>(this.globalService.getbaseUrl() + '/getVacationRequestList').toPromise();
  }

  async getVacationRequestsByConUserUidFromServer() {
    return await this.httpclient.get<VacationRequest[]>(this.globalService.getbaseUrl() + '/getVacationRequestListByUID/' +
      this.connectedService.getConnectedUser().uid).toPromise();
  }

  async getSelectedVacationRequestListByConUserSidFromServer() {
    return await this.httpclient.get<VacationRequest[]>(this.globalService.getbaseUrl() + '/getSelectedVacationRequestListBySID/' +
      this.connectedService.getConnectedUser().sid).toPromise();
  }

   async addVacationRequestServer(vacationRequest: VacationRequest) {
     return await this.httpclient.post<VacationRequest>(this.globalService.getbaseUrl() + '/createVacationRequest',
     JSON.stringify(vacationRequest),
      this.globalService.gethttpOptions()).toPromise();
  }

   async refuseVacationRequestServer(did: number) {
   return await this.httpclient.patch<VacationRequest>(this.globalService.getbaseUrl() +
     '/refuseVacationRequest/' + did + '/' + this.connectedService.getConnectedUser().uid,
      this.globalService.gethttpOptions()).toPromise();
  }

   async approveVacationRequestServer(did: number) {
     return await this.httpclient.patch<VacationRequest>(this.globalService.getbaseUrl() +
      '/approveVacationRequest/' + did + '/' + this.connectedService.getConnectedUser().uid,
      this.globalService.gethttpOptions()).toPromise();
  }

   async cancelVacationRequestServer(did: number) {
   return await this.httpclient.patch<VacationRequest>(this.globalService.getbaseUrl() +
      '/cancelVacationRequest/' + did + '/' + this.connectedService.getConnectedUser().uid,
      this.globalService.gethttpOptions()).toPromise();
  }

   async removeVacationRequestServer(did: number) {
     return await this.httpclient.delete<VacationRequest>(this.globalService.getbaseUrl() +
      '/removeVacationRequest/' + did + '/' + this.connectedService.getConnectedUser().uid,
      this.globalService.gethttpOptions()).toPromise();
  }
}
