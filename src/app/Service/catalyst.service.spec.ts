import { TestBed } from '@angular/core/testing';

import { CatalystService } from './catalyst.service';

describe('CatalystService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatalystService = TestBed.get(CatalystService);
    expect(service).toBeTruthy();
  });
});
