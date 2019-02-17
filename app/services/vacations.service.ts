import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { GlobalService } from '../services/global.service';
import { Vacations } from '../models/vacations.model';

@Injectable({
  providedIn: 'root'
})
export class VacationsService {
  vacationsSubject = new Subject<Vacations[]>();
  private vacations: Vacations[] = [];

  constructor(private httpclient: HttpClient, private globalService: GlobalService) { }

  emitUsersSubject() {
    if (this.vacations != null) {
      this.vacationsSubject.next(this.vacations.slice());
    }
  }
}
