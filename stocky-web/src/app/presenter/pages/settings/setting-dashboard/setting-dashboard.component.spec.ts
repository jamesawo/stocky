import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDashboardComponent } from './setting-dashboard.component';

describe('SettingDashboardComponent', () => {
  let component: SettingDashboardComponent;
  let fixture: ComponentFixture<SettingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
