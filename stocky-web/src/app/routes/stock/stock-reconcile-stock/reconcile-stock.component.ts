import {Component} from '@angular/core';
import {STOCK_RECONCILE} from '../../../data/constant/crumb.constant';
import {TableCol} from '../../../shared/components/table/table.component';

@Component({
    selector: 'app-reconcile-stock',
    templateUrl: './reconcile-stock.component.html',
    styles: []
})
export class ReconcileStockComponent {
    public crumbs = STOCK_RECONCILE;
    public isOpenHeader = true;
    public isLoading = false;

    public tableCols: TableCol[] = [
        {title: 'Stock #'},
        {title: 'Recorded By'},
        {title: 'Recorded Date'},
        {title: 'Unique Product Count'},
        {title: 'Total Product Qty'},
        {title: 'Stock Details '},
        {title: 'Action '}
    ];

    public onSearch = async (): Promise<void> => {};

    public onReset = (): void => {};

    public onCancel = (): void => {};


}
