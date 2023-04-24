import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavAppItemComponent } from './nav-app-item.component';
import { NavAppItemModule } from './nav-app-item.module';

describe('NavAppItemComponent', () => {
  let component: NavAppItemComponent;
  let fixture: ComponentFixture<NavAppItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NavAppItemModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAppItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
