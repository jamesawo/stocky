import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatusDropdownComponent } from './product-status-dropdown.component';

describe('ProductStatusDropdownComponent', () => {
  let component: ProductStatusDropdownComponent;
  let fixture: ComponentFixture<ProductStatusDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStatusDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStatusDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
