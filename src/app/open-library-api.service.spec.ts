import { TestBed } from '@angular/core/testing';

import { OpenLibraryAPIService } from './open-library-api.service';

describe('OpenLibraryAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenLibraryAPIService = TestBed.get(OpenLibraryAPIService);
    expect(service).toBeTruthy();
  });
});
