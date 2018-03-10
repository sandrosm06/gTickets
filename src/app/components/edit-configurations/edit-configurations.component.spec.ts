import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigurationsComponent } from './edit-configurations.component';

describe('EditConfigurationsComponent', () => {
  let component: EditConfigurationsComponent;
  let fixture: ComponentFixture<EditConfigurationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfigurationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
