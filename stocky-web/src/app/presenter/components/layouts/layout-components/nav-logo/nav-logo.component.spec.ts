import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavLogoComponent } from './nav-logo.component';
import { NavLogoModule } from './nav-logo.module';

describe('NavLogoComponent', () => {
  let component: NavLogoComponent;
  let fixture: ComponentFixture<NavLogoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NavLogoModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
