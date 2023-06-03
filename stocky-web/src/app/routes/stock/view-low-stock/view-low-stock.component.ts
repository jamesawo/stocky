import {Component} from '@angular/core';
import {STOCK_VIEW_LOW_PRODUCT} from '../../../data/constant/crumb.constant';
import {TableCol} from '../../../shared/components/table/table.component';

@Component({
    selector: 'app-view-low-stock',
    templateUrl: './view-low-stock.component.html',
    styles: []
})
export class ViewLowStockComponent {

    public crumbs = STOCK_VIEW_LOW_PRODUCT;
    public isOpenHeader = true;
    public isLoading = false;

    public tableCols: TableCol[] = [
        {title: 'Product'},
        {title: 'Brand'},
        {title: 'Category'},
        {title: 'Location'},
        {title: 'Qty Count'}
    ];

    public onSearchStock = async (): Promise<void> => {};

    public onResetSearchForm = (): void => {};

    public onCancelHandler = (): void => {};

    public handleCreateStock = (): void => {};

}
