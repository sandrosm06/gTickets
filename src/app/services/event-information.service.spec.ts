import { TestBed, inject } from '@angular/core/testing';

import { EventInformationService } from './event-information.service';

describe('EventInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventInformationService]
    });
  });

  it('should be created', inject([EventInformationService], (service: EventInformationService) => {
    expect(service).toBeTruthy();
  }));
});
