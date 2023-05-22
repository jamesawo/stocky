import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBasicTabComponent } from './product-basic-tab.component';

describe('ProductBasicTabComponent', () => {
  let component: ProductBasicTabComponent;
  let fixture: ComponentFixture<ProductBasicTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBasicTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBasicTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
