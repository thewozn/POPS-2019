import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidlignesComponent } from './validlignes.component';

describe('ValidlignesComponent', () => {
  let component: ValidlignesComponent;
  let fixture: ComponentFixture<ValidlignesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidlignesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidlignesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
