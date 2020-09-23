import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationSolveComponent } from './transportation-solve.component';

describe('TransportationSolveComponent', () => {
  let component: TransportationSolveComponent;
  let fixture: ComponentFixture<TransportationSolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportationSolveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportationSolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
