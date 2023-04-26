import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionParentComponent } from './accordion-parent.component';

describe('AccordionParentComponent', () => {
  let component: AccordionParentComponent;
  let fixture: ComponentFixture<AccordionParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccordionParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
