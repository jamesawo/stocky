import {Component} from '@angular/core';
import {STOCK_MANAGE_CRUMBS} from '../../../data/constant/crumb.constant';
import {TableCol} from '../../../shared/components/table/table.component';

@Component({
    selector: 'app-manage-stock',
    templateUrl: './manage-stock.component.html',
    styles: []
})
export class ManageStockComponent {

    public crumbs = STOCK_MANAGE_CRUMBS;
    public isOpenHeader = true;
    public isLoading = false;

    public tableCols: TableCol[] = [
        {title: 'Stock #'},
        {title: 'Recorded By'},
        {title: 'Recorded Date'},
        {title: 'Recorded items'},
        {title: 'Total Product Qty'},
        {title: 'Details'},
        {title: 'Action'}
    ];

    public onSearch = async (): Promise<void> => {};

    public onReset = (): void => {};

    public onCancel = (): void => {};

    public onCreate = (): void => {};


}
