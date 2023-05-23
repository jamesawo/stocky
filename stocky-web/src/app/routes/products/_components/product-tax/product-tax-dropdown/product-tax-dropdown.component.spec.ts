import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTaxDropdownComponent } from './product-tax-dropdown.component';

describe('ProductTaxDropdownComponent', () => {
  let component: ProductTaxDropdownComponent;
  let fixture: ComponentFixture<ProductTaxDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTaxDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTaxDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
