import { TestBed } from '@angular/core/testing';

import { DrivingHistoryService } from './driving-history.service';

describe('DrivingHistoryService', () => {
  let service: DrivingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrivingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
