import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {firstValueFrom, shareReplay} from 'rxjs';
import {FormProps} from '../../../../../data/payload/common.types';
import {getNzFormControlValidStatus} from '../../../../../shared/utils/util';
import {ProductUnitOfMeasurePayload} from '../../../_data/product-unit-of-measure.payload';
import {UnitOfMeasureUsecase} from '../../../_usecase/unit-of-measure.usecase';

@Component({
    selector: 'app-unit-of-measure-dropdown',
    templateUrl: './unit-of-measurement-dropdown.component.html',
    styles: []
})
export class UnitOfMeasurementDropdownComponent implements OnInit {
    public isLoading = false;
    public measures?: ProductUnitOfMeasurePayload[];

    @Input()
    public formProps?: FormProps;

    @Input()
    public value?: ProductUnitOfMeasurePayload;

    @Output()
    public valueChange: EventEmitter<ProductUnitOfMeasurePayload> =
        new EventEmitter<ProductUnitOfMeasurePayload>();

    protected readonly getFormControlValidityStatus = getNzFormControlValidStatus;

    constructor(private usecase: UnitOfMeasureUsecase) {}

    public ngOnInit(): void {
        this.usecase.trigger$.subscribe((change) => this.onLoadData());
    }

    public getLabel(data: ProductUnitOfMeasurePayload): string {
        return `${data.title} (${data.unit?.toLowerCase()})`;
    }

    public onValueChange(value: ProductUnitOfMeasurePayload): void {
        if (value) {
            this.valueChange?.emit(value);
        }
    }

    public hasFormGroup(): boolean {
        if (this.formProps) {
            return !!this.formProps.formGroup && !!this.formProps.controlName;
        }
        return false;
    }

    private async onLoadData(): Promise<void> {
        this.isLoading = true;
        this.measures = await firstValueFrom(this.usecase.getMany().pipe(shareReplay()));
        this.isLoading = false;
    }
}
