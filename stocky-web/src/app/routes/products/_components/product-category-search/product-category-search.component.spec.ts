import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategorySearchComponent } from './product-category-search.component';

describe('ProductCategorySearchComponent', () => {
  let component: ProductCategorySearchComponent;
  let fixture: ComponentFixture<ProductCategorySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategorySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCategorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
