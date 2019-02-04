import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheUtilisateurComponent } from './fiche-utilisateur.component';

describe('FicheUtilisateurComponent', () => {
  let component: FicheUtilisateurComponent;
  let fixture: ComponentFixture<FicheUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
