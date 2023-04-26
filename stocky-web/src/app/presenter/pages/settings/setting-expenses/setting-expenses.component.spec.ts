import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingExpensesComponent } from './setting-expenses.component';

describe('SettingExpensesComponent', () => {
  let component: SettingExpensesComponent;
  let fixture: ComponentFixture<SettingExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
