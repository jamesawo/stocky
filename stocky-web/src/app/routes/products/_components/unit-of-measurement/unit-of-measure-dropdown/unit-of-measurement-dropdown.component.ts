import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {map, Observable} from 'rxjs';
import {UnitOfMeasurePayload} from '../../../_data/unit-of-measure.payload';
import {UnitOfMeasureUsecase} from '../../../_usecase/unit-of-measure.usecase';

@Component({
    selector: 'app-unit-of-measure-dropdown',
    templateUrl: './unit-of-measurement-dropdown.component.html',
    styles: [],
})
export class UnitOfMeasurementDropdownComponent implements OnInit {
    public isLoading = false;
    @Input()
    public value?: UnitOfMeasurePayload;

    @Output()
    public valueChange: EventEmitter<UnitOfMeasurePayload> = new EventEmitter<UnitOfMeasurePayload>();

    public measures?: Observable<UnitOfMeasurePayload[]>;

    constructor(private usecase: UnitOfMeasureUsecase) {}

    public ngOnInit(): void {
        this.onLoadData();
        this.usecase.trigger$.subscribe((change) => this.onLoadData());
    }

    public getLabel(data: UnitOfMeasurePayload) {
        return `${data.title} (${data.unit?.toLowerCase()})`;
    }

    public onValueChange(value: UnitOfMeasurePayload) {
        if (value) {
            this.valueChange?.emit(value);
        }
    }

    private onLoadData() {
        this.isLoading = true;
        this.measures = this.usecase.getMany().pipe(
            map((value1) => {
                this.isLoading = false;
                return value1;
            })
        );
    }
}
