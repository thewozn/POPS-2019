import { Injectable, DirectiveDecorator } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { ConnectedService } from './connected.service';
import { VacationRequest } from '../models/vacation-request.model';


@Injectable()
export class VacationRequestService {
  vacationRequestSubject = new Subject<VacationRequest[]>();
  private vacationRequest: VacationRequest[] = [];

  constructor(private connectedService: ConnectedService, private httpclient: HttpClient, private globalService: GlobalService) {
  }

  emitVacationRequestsSubject() {
    if (this.vacationRequest != null) {
      this.vacationRequestSubject.next(this.vacationRequest.slice());
    }
  }

  getVacationRequestByDid(id: number) {
    const vr = this.vacationRequest.find(
      (res) => {
        return res.vid === id;
      }
    );
    return vr;
  }

  getVacationRequestsListFromServer() {
    this.httpclient.get<VacationRequest[]>(this.globalService.getbaseUrl() + '/getVacationRequestList').subscribe(
      (response) => {
        this.vacationRequest = response;
        this.emitVacationRequestsSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  getVacationRequestsByConUserUidFromServer() {
    this.httpclient.get<VacationRequest[]>(this.globalService.getbaseUrl() + '/getVacationRequestListByUID/' +
      this.connectedService.getConnectedUser().uid).subscribe(
      (response) => {
        this.vacationRequest = response;
        this.emitVacationRequestsSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }

  getSelectedVacationRequestListByConUserSidFromServer() {
    this.httpclient.get<VacationRequest[]>(this.globalService.getbaseUrl() + '/getSelectedVacationRequestListBySID/' +
      this.connectedService.getConnectedUser().sid).subscribe(
      (response) => {
        this.vacationRequest = response;
        this.emitVacationRequestsSubject();
      },
      (error) => {
        console.log('Erreur ! :' + error);
      }
    );
  }

  addVacationRequestServer(vacationRequest: VacationRequest) {
    this.httpclient.post<VacationRequest>(this.globalService.getbaseUrl() + '/createVacationRequest', JSON.stringify(vacationRequest),
      this.globalService.gethttpOptions()).subscribe(
        (response) => {
          this.getSelectedVacationRequestListByConUserSidFromServer();
        },
        (error) => {
          console.log('Erreur ! : ' + error.message);
        }
      );
  }

  refuseVacationRequestServer(did: number) {
    this.httpclient.patch<VacationRequest>(this.globalService.getbaseUrl() +
     '/refuseVacationRequest/' + did + '/' + this.connectedService.getConnectedUser().uid,
      this.globalService.gethttpOptions()).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log('Erreur ! : ' + error.message);
        }
      );
  }

  approveVacationRequestServer(did: number) {
    this.httpclient.patch<VacationRequest>(this.globalService.getbaseUrl() +
      '/approveVacationRequest/' + did + '/' + this.connectedService.getConnectedUser().uid,
      this.globalService.gethttpOptions()).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log('Erreur ! : ' + error.message);
        }
      );
  }

  cancelVacationRequestServer(did: number) {
    this.httpclient.patch<VacationRequest>(this.globalService.getbaseUrl() +
      '/cancelVacationRequest/' + did + '/' + this.connectedService.getConnectedUser().uid,
      this.globalService.gethttpOptions()).subscribe(
        (response) => {
          console.log(response);
          this.getVacationRequestsListFromServer();
        },
        (error) => {
          console.log('Erreur ! : ' + error.message);
        }
      );
  }


}
