import { TestBed } from '@angular/core/testing';

import { SimplexSolverService } from './simplex-solver.service';

describe('SimplexSolverService', () => {
  let service: SimplexSolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimplexSolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
