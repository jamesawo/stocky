import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingPeopleComponent } from './setting-people.component';

describe('SettingPeopleComponent', () => {
  let component: SettingPeopleComponent;
  let fixture: ComponentFixture<SettingPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingPeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
