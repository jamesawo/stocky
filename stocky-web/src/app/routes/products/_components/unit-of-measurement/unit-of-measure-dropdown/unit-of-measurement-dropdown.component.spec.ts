import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitOfMeasurementDropdownComponent} from './unit-of-measurement-dropdown.component';

describe('UnitOfMeasureDropdownComponent', () => {
    let component: UnitOfMeasurementDropdownComponent;
    let fixture: ComponentFixture<UnitOfMeasurementDropdownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UnitOfMeasurementDropdownComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UnitOfMeasurementDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
