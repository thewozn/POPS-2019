import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../services/global.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
@Injectable()
export class ConnectedService {
  private isAuth: BehaviorSubject<boolean>;
  connecteduserSubject = new Subject<User>();
  connecteduser: User;

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

  constructor(private userService: UserService, private httpclient: HttpClient, private globalService: GlobalService) {
    this.isAuth = new BehaviorSubject<boolean>(false);
    // this.connectedUser = new BehaviorSubject<User>(null);
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

  // public getConnectedUser(): Observable<User> {
  //   return this.connectedUser.asObservable();
  // }

  // private setConnectedUser(newValue: User): void {
  //   this.connectedUser.next(newValue);
  // }

  signIn(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.setIsAuth(true);
      this.authentification(email, pass);
    });
  }

  signOut() {
    this.setIsAuth(false);
  }

  authentification(email: string, pass: string) {
    this.httpclient.get<User>(this.globalService.getbaseUrl() + '/mailTest/' + email).subscribe(
      (response) => {
        this.connecteduser = response;
        console.log(this.connecteduser);
        this.emitConnectedUserSubject();
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      }
    );
  }
}
