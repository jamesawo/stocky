import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingFieldComponent } from './setting-field.component';

describe('SettingFieldComponent', () => {
  let component: SettingFieldComponent;
  let fixture: ComponentFixture<SettingFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
