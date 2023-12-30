import {Component, Input} from '@angular/core';
import {SaleProductSearchDisplayView} from '../../_data/sale-cart.enum';
import {SaleProductsUsecase} from '../../_usecase/sale-products.usecase';


@Component({
    selector: 'app-sales-product-selection',
    templateUrl: './sales-product-selection.component.html',
    styles: []
})
export class SalesProductSelectionComponent {
    public readonly display = SaleProductSearchDisplayView;
    public isSearching = false;

    @Input()
    public type: SaleProductSearchDisplayView = SaleProductSearchDisplayView.list;

    constructor(private saleProductUsecase: SaleProductsUsecase) {
    }

    ngOnInit() {
        this.saleProductUsecase.searching$.subscribe(val => this.isSearching = val);
    }

}
