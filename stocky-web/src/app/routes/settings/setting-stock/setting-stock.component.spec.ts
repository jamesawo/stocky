import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingStockComponent } from './setting-stock.component';

describe('SettingStockComponent', () => {
  let component: SettingStockComponent;
  let fixture: ComponentFixture<SettingStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
