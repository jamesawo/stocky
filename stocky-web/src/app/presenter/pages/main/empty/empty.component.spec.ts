import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmptyComponent } from './empty.component';
import { EmptyModule } from './empty.module';

describe('EmptyComponent', () => {
  let component: EmptyComponent;
  let fixture: ComponentFixture<EmptyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EmptyModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
