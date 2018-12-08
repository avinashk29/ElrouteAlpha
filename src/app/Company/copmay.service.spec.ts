import { TestBed } from '@angular/core/testing';

import { CopmayService } from './copmay.service';

describe('CopmayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CopmayService = TestBed.get(CopmayService);
    expect(service).toBeTruthy();
  });
});
