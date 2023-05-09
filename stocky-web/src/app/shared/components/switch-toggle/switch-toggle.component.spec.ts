import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchToggleComponent } from './switch-toggle.component';

describe('SwitchToggleComponent', () => {
  let component: SwitchToggleComponent;
  let fixture: ComponentFixture<SwitchToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
