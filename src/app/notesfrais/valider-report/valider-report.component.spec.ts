import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderReportComponent } from './valider-report.component';

describe('ValiderReportComponent', () => {
  let component: ValiderReportComponent;
  let fixture: ComponentFixture<ValiderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValiderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValiderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
