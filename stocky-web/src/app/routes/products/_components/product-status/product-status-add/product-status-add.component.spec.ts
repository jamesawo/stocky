import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStatusAddComponent } from './product-status-add.component';

describe('ProductStatusAddComponent', () => {
  let component: ProductStatusAddComponent;
  let fixture: ComponentFixture<ProductStatusAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductStatusAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStatusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
