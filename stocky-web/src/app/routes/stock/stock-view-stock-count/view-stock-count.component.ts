import {Component} from '@angular/core';
import {STOCK_VIEW_COUNT} from '../../../data/constant/crumb.constant';
import {TableCol} from '../../../shared/components/table/table.component';

@Component({
    selector: 'app-view-stock-count',
    templateUrl: './view-stock-count.component.html',
    styles: []
})
export class ViewStockCountComponent {

    public crumbs = STOCK_VIEW_COUNT;
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
