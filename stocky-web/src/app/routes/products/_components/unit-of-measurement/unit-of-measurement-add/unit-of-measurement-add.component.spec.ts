import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UnitOfMeasurementAddComponent} from './unit-of-measurement-add.component';

describe('AddUnitOfMeasurementComponent', () => {
    let component: UnitOfMeasurementAddComponent;
    let fixture: ComponentFixture<UnitOfMeasurementAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UnitOfMeasurementAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UnitOfMeasurementAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
