import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../services/global.service';
import { User } from '../models/user.model';
@Injectable()
export class ConnectedService {
  private isAuth: BehaviorSubject<boolean>;
  connecteduserSubject = new Subject<User>();
  private connecteduser: User;

  prenom = 'Didier';
  nom = 'LEBLANC';
  mail = 'didier.leblanc@polytech.com';
  service = 'RH';
  account_type = 'Collaborateur'; // Can be Chef or Collaborateur
  notified = true;
  notifications = [
    'Congés validés (CDS)',
    'Affectation mission (E6835)',
    'Congés validés (RH)'
  ];

  constructor(private httpclient: HttpClient, private globalService: GlobalService) {
    this.isAuth = new BehaviorSubject<boolean>(false);
  }

  getConnectedUser() {
    return this.connecteduser;
  }

  emitConnectedUserSubject() {
    if (this.connecteduser != null) {
      this.connecteduserSubject.next(this.connecteduser);
    }
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
            this.emitConnectedUserSubject();
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
  }
}