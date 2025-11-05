import { TestBed } from '@angular/core/testing';

import { Apicalls } from './apicalls';

describe('Apicalls', () => {
  let service: Apicalls;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Apicalls);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
