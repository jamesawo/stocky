import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavInputSearchComponent } from './nav-input-search.component';
import { NavInputSearchModule } from './nav-input-search.module';

describe('NavInputSearchComponent', () => {
  let component: NavInputSearchComponent;
  let fixture: ComponentFixture<NavInputSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NavInputSearchModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavInputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
