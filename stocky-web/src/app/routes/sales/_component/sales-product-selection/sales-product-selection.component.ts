import {Component, Input} from '@angular/core';
import {SaleProductsUsecase} from '../../_usecase/sale-products.usecase';

export enum DisplayType {
    'list',
    'grid'
}

@Component({
    selector: 'app-sales-product-selection',
    templateUrl: './sales-product-selection.component.html',
    styles: []
})
export class SalesProductSelectionComponent {
    public readonly display = DisplayType;
    public isSearching = false;

    @Input()
    public type: DisplayType = DisplayType.grid;

    constructor(private saleProductUsecase: SaleProductsUsecase) {}

    ngOnInit() {
        this.saleProductUsecase.searching$.subscribe(val => this.isSearching = val);
    }

}
