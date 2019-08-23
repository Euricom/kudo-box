import { TestBed } from '@angular/core/testing';

import { KudoService } from './kudo.service';

describe('KudoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KudoService = TestBed.get(KudoService);
    expect(service).toBeTruthy();
  });
});
