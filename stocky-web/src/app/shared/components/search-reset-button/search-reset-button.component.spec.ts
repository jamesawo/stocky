import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResetButtonComponent } from './search-reset-button.component';

describe('SearchResetButtonComponent', () => {
  let component: SearchResetButtonComponent;
  let fixture: ComponentFixture<SearchResetButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchResetButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResetButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
