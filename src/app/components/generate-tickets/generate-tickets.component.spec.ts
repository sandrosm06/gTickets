import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTicketsComponent } from './generate-tickets.component';

describe('GenerateTicketsComponent', () => {
  let component: GenerateTicketsComponent;
  let fixture: ComponentFixture<GenerateTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
