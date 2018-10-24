import { TestBed, inject } from '@angular/core/testing';

import { CoverageService } from './coverage.service';

describe('CoverageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoverageService]
    });
  });

  it('should be created', inject([CoverageService], (service: CoverageService) => {
    expect(service).toBeTruthy();
  }));
});
