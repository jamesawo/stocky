import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {firstValueFrom, shareReplay} from 'rxjs';
import {CommonPayload} from '../../../../../data/payload/common.payload';
import {FormProps} from '../../../../../data/payload/common.types';
import {UtilService} from '../../../../../shared/utils/util.service';
import {ProductStatusPayload} from '../../../_data/product.payload';
import {ProductStatusUsecase} from '../../../_usecase/product-status.usecase';

@Component({
    selector: 'app-product-status-dropdown',
    templateUrl: './product-status-dropdown.component.html',
    styles: []
})
export class ProductStatusDropdownComponent implements OnInit {
    @Input()
    public formProps?: FormProps;

    @Input()
    public value?: CommonPayload;

    @Output()
    public valueChange: EventEmitter<ProductStatusPayload> = new EventEmitter<ProductStatusPayload>();

    public isLoading = false;
    public statusList?: ProductStatusPayload[];
    protected readonly getFormControlValidityStatus = this.util.getNzFormControlValidStatus;

    constructor(private usecase: ProductStatusUsecase, private util: UtilService) {}

    public ngOnInit(): void {
        this.usecase.trigger$.subscribe((change) => this.onLoadData());
        this.setDefault();
    }

    public onValueChange(value: ProductStatusPayload) {
        if (value) {
            this.valueChange?.emit(value);
        }
    }

    public async onLoadData(): Promise<void> {
        this.isLoading = true;
        this.statusList = await firstValueFrom(this.usecase.getMany().pipe(shareReplay()));
        this.isLoading = false;
    }

    public hasFormGroup(): boolean {
        if (this.formProps) {
            return !!this.formProps.formGroup && !!this.formProps.controlName;
        }
        return false;
    }

    private setDefault() {
        const formProps = this.formProps;
        if (formProps?.formGroup && formProps.controlName) {
            const select = formProps.formGroup.controls[formProps.controlName].value;
            if (select) {
                const list = [...this.statusList ?? []];
                this.statusList = [...list, select];
            }
        }
    }
}
