import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTaxAddComponent } from './product-tax-add.component';

describe('ProductTaxAddComponent', () => {
  let component: ProductTaxAddComponent;
  let fixture: ComponentFixture<ProductTaxAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTaxAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductTaxAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
