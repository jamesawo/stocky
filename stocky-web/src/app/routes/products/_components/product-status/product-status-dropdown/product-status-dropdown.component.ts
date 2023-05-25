import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {map, Observable} from 'rxjs';
import {CommonPayload} from '../../../../../data/payload/common.payload';
import {ProductStatusPayload} from '../../../_data/product.payload';
import {FormProps} from '../../../_data/product.types';
import {ProductStatusUsecase} from '../../../_usecase/product-status.usecase';

@Component({
    selector: 'app-product-status-dropdown',
    templateUrl: './product-status-dropdown.component.html',
    styles: [],
})
export class ProductStatusDropdownComponent implements OnInit {
    @Input()
    public formProps?: FormProps;

    @Input()
    public value?: CommonPayload;

    @Output()
    public valueChange: EventEmitter<ProductStatusPayload> = new EventEmitter<ProductStatusPayload>();

    public isLoading = false;
    public statusList?: Observable<ProductStatusPayload[]>;

    constructor(private usecase: ProductStatusUsecase) {}

    public ngOnInit(): void {
        this.onLoadData();
        this.usecase.trigger$.subscribe((change) => this.onLoadData());
    }

    public onValueChange(value: ProductStatusPayload) {
        if (value) {
            this.valueChange?.emit(value);
        }
    }

    public onLoadData(): void {
        this.isLoading = true;
        this.statusList = this.usecase.getMany().pipe(
            map((value) => {
                this.isLoading = false;
                return value;
            })
        );
    }

    public hasFormGroup(): boolean {
        if (this.formProps) {
            return !!this.formProps.formGroup && !!this.formProps.controlName;
        }
        return false;
    }
}
