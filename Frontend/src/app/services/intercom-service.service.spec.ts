import { TestBed } from '@angular/core/testing';

import { IntercomServiceService } from './intercom-service.service';

describe('IntercomServiceService', () => {
  let service: IntercomServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntercomServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
