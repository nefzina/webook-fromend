import { TestBed } from '@angular/core/testing';

import { MockBookService } from '../mock-book.service';

describe('MockBookService', () => {
  let service: MockBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
