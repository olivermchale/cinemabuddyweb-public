import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CinemasService } from './cinemas.service';

describe('CinemasService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: CinemasService = TestBed.get(CinemasService);
    expect(service).toBeTruthy();
  });
});
