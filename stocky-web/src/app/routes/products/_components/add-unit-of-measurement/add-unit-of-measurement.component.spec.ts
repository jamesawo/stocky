import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnitOfMeasurementComponent } from './add-unit-of-measurement.component';

describe('AddUnitOfMeasurementComponent', () => {
  let component: AddUnitOfMeasurementComponent;
  let fixture: ComponentFixture<AddUnitOfMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUnitOfMeasurementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUnitOfMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
