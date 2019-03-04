import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnEmploeComponent } from './ann-emploe.component';

describe('AnnEmploeComponent', () => {
  let component: AnnEmploeComponent;
  let fixture: ComponentFixture<AnnEmploeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnEmploeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnEmploeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
