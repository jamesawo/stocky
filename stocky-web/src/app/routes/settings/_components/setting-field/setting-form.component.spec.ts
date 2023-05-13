import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingFormComponent } from './setting-form.component';

describe('SettingFieldComponent', () => {
    let component: SettingFormComponent;
    let fixture: ComponentFixture<SettingFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SettingFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
