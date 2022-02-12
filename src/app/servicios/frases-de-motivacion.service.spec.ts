import { TestBed } from '@angular/core/testing';

import { FrasesDeMotivacionService } from './frases-de-motivacion.service';

describe('FrasesDeMotivacionService', () => {
  let service: FrasesDeMotivacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrasesDeMotivacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
