import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplexSolverInputsComponent } from './simplex-solver-inputs.component';

describe('SimplexSolverInputsComponent', () => {
  let component: SimplexSolverInputsComponent;
  let fixture: ComponentFixture<SimplexSolverInputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplexSolverInputsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplexSolverInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
