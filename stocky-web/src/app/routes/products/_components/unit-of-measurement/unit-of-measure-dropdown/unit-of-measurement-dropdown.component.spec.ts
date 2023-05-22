import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitOfMeasureDropdownComponent } from './unit-of-measure-dropdown.component';

describe('UnitOfMeasureDropdownComponent', () => {
  let component: UnitOfMeasureDropdownComponent;
  let fixture: ComponentFixture<UnitOfMeasureDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitOfMeasureDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitOfMeasureDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
