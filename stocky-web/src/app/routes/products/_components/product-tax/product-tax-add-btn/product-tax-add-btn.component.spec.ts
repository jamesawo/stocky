import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTaxAddBtnComponent } from './product-tax-add-btn.component';

describe('ProductTaxAddBtnComponent', () => {
  let component: ProductTaxAddBtnComponent;
  let fixture: ComponentFixture<ProductTaxAddBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTaxAddBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTaxAddBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
