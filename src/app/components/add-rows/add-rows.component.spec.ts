import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRowsComponent } from './add-rows.component';

describe('AddRowsComponent', () => {
  let component: AddRowsComponent;
  let fixture: ComponentFixture<AddRowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
