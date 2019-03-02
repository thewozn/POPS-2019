import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from '../services/global.service';
import { ConnectedService } from '../services/connected.service';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpclient: HttpClient, private globalService: GlobalService, private connectedService: ConnectedService) {}


  getUserById(user: User[], id: number) {
    const u = user.find(
      (res) => {
        return res.uid === id;
      }
    );
    return u;
  }

  async getUserByIdFromServer(id: number) {
    return await this.httpclient.get<User[]>(this.globalService.getbaseUrl() + '/getUser/' + id).toPromise();
  }

  async getUsersFromServer() {
    return await this.httpclient.get<User[]>(this.globalService.getbaseUrl() + '/getUserList').toPromise();
  }

  async getUsersByConUserSidFromServer() {
    return await this.httpclient.get<User[]>(this.globalService.getbaseUrl() + '/getUserListByService/' +
    this.connectedService.getConnectedUser().sid).toPromise();
  }

   async addUserServer(user: User) {
    return await this.httpclient.post<User>(this.globalService.getbaseUrl() + '/createUser', JSON.stringify(user),
    this.globalService.gethttpOptions()).toPromise();
  }

   async modifUserServer(user: User) {
    return await this.httpclient.patch<User>(this.globalService.getbaseUrl() + '/updateUser', JSON.stringify(user),
    this.globalService.gethttpOptions()).toPromise();
  }
}

