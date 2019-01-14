import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesfraisComponent } from './notesfrais.component';

describe('NotesfraisComponent', () => {
  let component: NotesfraisComponent;
  let fixture: ComponentFixture<NotesfraisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesfraisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesfraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
