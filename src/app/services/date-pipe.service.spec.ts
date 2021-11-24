import { TestBed } from '@angular/core/testing';

import { DatePipeService } from './date-pipe.service';

describe('DatePipeService', () => {
  let service: DatePipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatePipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
