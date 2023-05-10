import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSalesComponent } from './setting-sales.component';

describe('SettingSalesComponent', () => {
  let component: SettingSalesComponent;
  let fixture: ComponentFixture<SettingSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
