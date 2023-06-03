import {Component} from '@angular/core';
import {STOCK_MANAGE_CRUMBS} from '../../../data/constant/crumb.constant';
import {TableCol} from '../../../shared/components/table/table.component';

@Component({
    selector: 'app-record-stock-balance',
    templateUrl: './record-stock-balance.component.html',
    styles: []
})
export class RecordStockBalanceComponent {

    public crumbs = STOCK_MANAGE_CRUMBS;
    public isOpenHeader = true;
    public isLoading = false;

    public tableCols: TableCol[] = [
        {title: 'Recorded Date'},
        {title: 'Recorded By'},
        {title: 'Verify Status'},
        {title: 'Verified By'},
        {title: 'Approved Status'},
        {title: 'Approved By'},
        {title: 'Action'}
    ];

    public onSearch = async (): Promise<void> => {};

    public onReset = (): void => {};

    public onCancel = (): void => {};

    public onCreate = (): void => {};

}
