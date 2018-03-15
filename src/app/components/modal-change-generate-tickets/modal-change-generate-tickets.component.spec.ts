import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeGenerateTicketsComponent } from './modal-change-generate-tickets.component';

describe('ModalChangeGenerateTicketsComponent', () => {
  let component: ModalChangeGenerateTicketsComponent;
  let fixture: ComponentFixture<ModalChangeGenerateTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalChangeGenerateTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalChangeGenerateTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
