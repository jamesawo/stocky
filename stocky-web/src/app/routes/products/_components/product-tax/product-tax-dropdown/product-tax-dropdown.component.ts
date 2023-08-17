import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

import {firstValueFrom} from 'rxjs';
import {FormProps} from '../../../../../data/payload/common.types';
import {UtilService} from '../../../../../shared/utils/util.service';
import {ProductTaxPayload} from '../../../_data/product.payload';
import {ProductTaxUsecase} from '../../../_usecase/product-tax.usecase';

@Component({
    selector: 'app-product-tax-dropdown',
    templateUrl: './product-tax-dropdown.component.html',
    styles: []
})
export class ProductTaxDropdownComponent implements OnInit {

    public listOfOption: Array<{label: string; value: string}> = [];
    public selectedOptions: string[] = [];
    public isLoading = false;
    public listOfTax: ProductTaxPayload[] = [];

    @Input()
    class?: string;

    @Input()
    public form?: FormProps;

    @Input()
    public value?: ProductTaxPayload[] = [];

    @Output()
    public valueChange: EventEmitter<ProductTaxPayload[]> = new EventEmitter<ProductTaxPayload[]>();

    public selectedControl: FormControl = new FormControl();

    constructor(private usecase: ProductTaxUsecase, private util: UtilService) {}

    public title(tax: ProductTaxPayload) {
        return this.util.getTaxTitle(tax);
    }

    public ngOnInit(): void {
        this.setSelectedOptionsInFormGroupOrValue().then();
        this.usecase.trigger$.subscribe((change) => this.onLoadData());
    }

    public async onLoadData(): Promise<void> {
        this.isLoading = true;
        const children: Array<{label: string; value: string}> = [];
        let data = await firstValueFrom(this.usecase.getMany());

        for (let tax of data) {
            children.push({label: this.title(tax), value: this.title(tax)});
        }
        this.listOfOption = children;
        this.listOfTax = data;
    }

    public onValueChange(value: ProductTaxPayload[]) {
        if (value) {
            const taxes = this.mapToTaxPayload(value as any);
            this.valueChange?.emit(taxes);
            this.updateFormGroupIfPresent(taxes);
        }
    }

    private mapToTaxPayload(titles: string[]): ProductTaxPayload[] {
        let taxes: ProductTaxPayload[] = [];
        for (const tax of this.listOfTax) {
            for (let title of titles) {
                if (this.title(tax) == title) {
                    taxes.push(tax);
                }
            }
        }
        return taxes;
    }

    private updateFormGroupIfPresent(value: ProductTaxPayload[]) {
        if (this.form && this.form.formGroup && this.form.controlName) {
            let control = this.form.controlName;
            this.form.formGroup.get(control)?.setValue(value);
            this.form = {...this.form!};
        }
    }

    private async setSelectedOptionsInFormGroupOrValue() {
        const formProps = this.form;
        if (formProps?.formGroup && formProps.controlName) {
            const select: ProductTaxPayload[] = formProps.formGroup.controls[formProps.controlName].value;
            this.addSelectedItems(select);
        } else if (this.value) {
            this.addSelectedItems(this.value);
        }
    }

    private addSelectedItems(list: ProductTaxPayload[]) {
        for (let tax of list) {
            this.selectedOptions.push(this.title(tax));
        }
    }
}
