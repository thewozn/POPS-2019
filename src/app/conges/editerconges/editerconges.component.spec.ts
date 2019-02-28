import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditercongesComponent } from './editerconges.component';

describe('EditercongesComponent', () => {
  let component: EditercongesComponent;
  let fixture: ComponentFixture<EditercongesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditercongesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditercongesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
