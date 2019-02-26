import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';


import { Service } from '../../models/service.model';
import { ServiceService } from '../../services/service.service';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-gestion-services',
  templateUrl: './gestion-services.component.html',
  styleUrls: ['./gestion-services.component.scss']
})
export class GestionServicesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'head', 'modif', 'supprimer'];
  service: Service[];
  serviceSubscription: Subscription;

  user: User[];
  userSubscription: Subscription;
  constructor(private serviceService: ServiceService, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit() {
    this.serviceService.getServicesFromServer();
    this.serviceSubscription = this.serviceService.serviceSubject.subscribe(
      (services: Service[]) => {
        this.service = services;
      }
    );

    this.userService.getUsersFromServer();
    this.userSubscription = this.userService.userSubject.subscribe(
      (users: User[]) => {
        this.user = users;
      }
    );
  }

  addService(form: NgForm) {
    const newService: Service = new Service(null, form.value['name'], form.value['hos']);

    this.serviceService.addServiceServer(newService);
    this.serviceService.getServicesFromServer();
    this.modalService.dismissAll();
  }

  openCreer(content) {
    this.modalService.open(content, { centered: true });
  }

  openModif(content, element: Service) {
    this.modalService.open(content, { centered: true });
  }

  openSuppr(content) {
    this.modalService.open(content, { centered: true });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.serviceSubscription.unsubscribe();
  }
}
