import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { UserMission } from '../models/user-mission.model';

@Injectable({
  providedIn: 'root'
})
export class UserMissionService {
  umsSubject = new Subject<UserMission[]>();
  private ums: UserMission[] = [];

  constructor(private httpclient: HttpClient, private globalService: GlobalService) { }

  emitUsersSubject() {
    if (this.ums != null) {
      this.umsSubject.next(this.ums.slice());
    }
  }
}
