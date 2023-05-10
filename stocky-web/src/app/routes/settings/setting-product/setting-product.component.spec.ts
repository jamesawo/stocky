import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingProductComponent } from './setting-product.component';

describe('SettingProductComponent', () => {
  let component: SettingProductComponent;
  let fixture: ComponentFixture<SettingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
