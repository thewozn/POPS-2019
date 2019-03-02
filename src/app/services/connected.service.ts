import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../services/global.service';
import { ServiceService } from '../services/service.service';

import { User } from '../models/user.model';
import { Service } from '../models/service.model';
@Injectable()
export class ConnectedService {
  private isAuth: BehaviorSubject<boolean>;
  private connecteduser: User;
  private connecteduserservice: Service;
  constructor(private httpclient: HttpClient, private globalService: GlobalService, private serviceService: ServiceService) {
    this.isAuth = new BehaviorSubject<boolean>(false);
  }

  getConnectedUser() {
    return this.connecteduser;
  }

  getConnectedUserService() {
    return this.connecteduserservice;
  }

  public getIsAuth(): Observable<boolean> {
    return this.isAuth.asObservable();
  }

  private setIsAuth(newValue: boolean): void {
    this.isAuth.next(newValue);
  }

  signOut() {
    this.setIsAuth(false);
  }

  signIn(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.httpclient.get<User>(this.globalService.getbaseUrl() + '/authentication/' + email + '/' + pass)
        .toPromise()
        .then(
          response => { // Success
            this.connecteduser = response;
            this.serviceService.getServiceByIdFromServer(this.connecteduser.sid).then(
              (data) => {
                this.connecteduserservice = data;
              }
            );
            this.setIsAuth(true);
            resolve();
          },
          msg => { // Error
            reject(msg);
          }
        );
    });
  }

  conMen() {
    this.setIsAuth(true);
    this.connecteduser = null;
  }
}
