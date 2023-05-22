import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatusAddBtnComponent } from './product-status-add-btn.component';

describe('ProductStatusAddBtnComponent', () => {
  let component: ProductStatusAddBtnComponent;
  let fixture: ComponentFixture<ProductStatusAddBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStatusAddBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStatusAddBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
