import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableItemEditableComponent } from './table-item-editable.component';

describe('TableItemEditableComponent', () => {
  let component: TableItemEditableComponent;
  let fixture: ComponentFixture<TableItemEditableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableItemEditableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableItemEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
