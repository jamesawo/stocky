import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportUploadButtonComponent } from './export-upload-button.component';

describe('ExportUploadButtonComponent', () => {
  let component: ExportUploadButtonComponent;
  let fixture: ComponentFixture<ExportUploadButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportUploadButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportUploadButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
