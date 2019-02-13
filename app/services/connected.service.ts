import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
@Injectable()
export class ConnectedService {
  private isAuth: BehaviorSubject<boolean>;
  connecteduser: any;

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

  constructor(private userService: UserService) {
    this.isAuth = new BehaviorSubject<boolean>(false);
  }

  public getIsAuth(): Observable<boolean> {
    return this.isAuth.asObservable();
  }

  private setIsAuth(newValue: boolean): void {
    this.isAuth.next(newValue);
  }

  signIn(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.setIsAuth(true);
      this.userService.authentification(email, pass).subscribe(data => {
        this.connecteduser = data;
      });
    });
  }

  signOut() {
    this.setIsAuth(false);
  }
}
