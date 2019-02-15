import { TestBed } from '@angular/core/testing';

import { CinemasService } from './cinemas.service';

describe('CinemasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CinemasService = TestBed.get(CinemasService);
    expect(service).toBeTruthy();
  });
});
