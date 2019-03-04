import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarNoteComponentComponent } from './snackbar-note-component.component';

describe('SnackbarNoteComponentComponent', () => {
  let component: SnackbarNoteComponentComponent;
  let fixture: ComponentFixture<SnackbarNoteComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarNoteComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarNoteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
