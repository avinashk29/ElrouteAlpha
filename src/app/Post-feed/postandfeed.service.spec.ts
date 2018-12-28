import { TestBed } from '@angular/core/testing';

import { PostandfeedService } from './postandfeed.service';

describe('PostandfeedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostandfeedService = TestBed.get(PostandfeedService);
    expect(service).toBeTruthy();
  });
});
