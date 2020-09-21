import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EqSystemComponent } from './eq-system.component';

describe('EqSystemComponent', () => {
  let component: EqSystemComponent;
  let fixture: ComponentFixture<EqSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EqSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EqSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
