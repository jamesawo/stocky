import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

import {map, Observable} from 'rxjs';
import {CommonPayload} from '../../../../../data/payload/common.payload';
import {ProductTaxPayload} from '../../../_data/product.payload';
import {FormProps} from '../../../_data/product.types';
import {ProductTaxUsecase} from '../../../_usecase/product-tax.usecase';

@Component({
    selector: 'app-product-tax-dropdown',
    templateUrl: './product-tax-dropdown.component.html',
    styles: []
})
export class ProductTaxDropdownComponent implements OnInit {
    public isLoading = false;
    public dataList?: Observable<ProductTaxPayload[]>;

    @Input()
    form?: FormProps;

    @Input()
    public value?: CommonPayload;

    @Output()
    public valueChange: EventEmitter<ProductTaxPayload> = new EventEmitter<ProductTaxPayload>();

    public selectedControl: FormControl = new FormControl();


    constructor(private usecase: ProductTaxUsecase) {}

    public ngOnInit(): void {
        this.onLoadData();
        this.usecase.trigger$.subscribe((change) => this.onLoadData());
    }

    public onValueChange(value: any) {
        if (value) {
            this.valueChange?.emit(value);
            this.updateFormGroupIfPresent(value);
        }
    }

    public onLoadData(): void {
        this.isLoading = true;
        this.dataList = this.usecase.getMany().pipe(
            map((value) => {
                this.isLoading = false;
                return value;
            })
        );
    }

    public canUseFormGroup() {
        if (this.form) {
            return !!this.form.formGroup && !!this.form.controlName;
        }
        return false;
    }

    private updateFormGroupIfPresent(value: ProductTaxPayload) {
        if (this.form && this.form.formGroup && this.form.controlName) {
            let control = this.form.controlName;
            this.form.formGroup.get(control)?.setValue(value);
            this.form = {...this.form!};
        }
    }
}
