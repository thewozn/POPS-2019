import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private baseUrl = '//localhost:8080';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  getbaseUrl() {
    return this.baseUrl;
  }

  gethttpOptions() {
    return this.httpOptions;
  }
  constructor() { }
}
