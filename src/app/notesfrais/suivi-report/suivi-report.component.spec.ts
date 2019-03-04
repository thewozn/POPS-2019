import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviReportComponent } from './suivi-report.component';

describe('SuiviReportComponent', () => {
  let component: SuiviReportComponent;
  let fixture: ComponentFixture<SuiviReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
