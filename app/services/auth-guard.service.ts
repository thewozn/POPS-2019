import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ConnectedService } from '../services/connected.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  authStatus: Boolean;
  constructor(private connectedService: ConnectedService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.connectedService.getIsAuth().subscribe(
      (value) => {
        this.authStatus = value;
      }
      );
    if (this.authStatus) {
      return true;
    } else {
      this.router.navigate(['/connexion']);
    }
      return null;
    }
  }

