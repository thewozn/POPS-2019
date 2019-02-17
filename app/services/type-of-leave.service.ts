import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { TypeOfLeave } from '../models/type-of-leave.model';

@Injectable({
  providedIn: 'root'
})
export class TypeOfLeaveService {
  tolsSubject = new Subject<TypeOfLeave[]>();
  private tols: TypeOfLeave[] = [];

  constructor(private httpclient: HttpClient, private globalService: GlobalService) { }

  emitUsersSubject() {
    if (this.tols != null) {
      this.tolsSubject.next(this.tols.slice());
    }
  }
}
