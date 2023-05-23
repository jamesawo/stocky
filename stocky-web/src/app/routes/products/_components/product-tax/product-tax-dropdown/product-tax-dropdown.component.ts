import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {map, Observable} from 'rxjs';
import {CommonPayload} from '../../../../../data/payload/common.payload';
import {ProductTaxPayload} from '../../../_data/product.payload';
import {ProductTaxUsecase} from '../../../_usecase/product-tax.usecase';

@Component({
    selector: 'app-product-tax-dropdown',
    templateUrl: './product-tax-dropdown.component.html',
    styles: [],
})
export class ProductTaxDropdownComponent implements OnInit {
    public isLoading = false;
    public dataList?: Observable<ProductTaxPayload[]>;

    @Input()
    public value?: CommonPayload;

    @Output()
    public valueChange: EventEmitter<ProductTaxPayload> = new EventEmitter<ProductTaxPayload>();

    constructor(private usecase: ProductTaxUsecase) {}

    public ngOnInit(): void {
        this.onLoadData();
        this.usecase.trigger$.subscribe((change) => this.onLoadData());
    }

    public onValueChange(value: ProductTaxPayload) {
        if (value) {
            this.valueChange?.emit(value);
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
}