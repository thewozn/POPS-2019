import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MesLignesComponent } from './mes-lignes.component';

describe('MesLignesComponent', () => {
  let component: MesLignesComponent;
  let fixture: ComponentFixture<MesLignesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MesLignesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MesLignesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
