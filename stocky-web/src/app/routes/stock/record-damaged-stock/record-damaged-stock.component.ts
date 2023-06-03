import {Component} from '@angular/core';
import {STOCK_MANAGE_CRUMBS} from '../../../data/constant/crumb.constant';
import {TableCol} from '../../../shared/components/table/table.component';

@Component({
    selector: 'app-record-damaged-stock',
    templateUrl: './record-damaged-stock.component.html',
    styles: []
})
export class RecordDamagedStockComponent {


    public crumbs = STOCK_MANAGE_CRUMBS;
    public isOpenHeader = true;
    public isLoading = false;

    public tableCols: TableCol[] = [
        {title: 'Location'},
        {title: 'Product'},
        {title: 'Category'},
        {title: 'Recorded By'},
        {title: 'Recorded Date'},
        {title: 'Comment'},
        {title: 'Verify Status'},
        {title: 'Verified By'},
        {title: 'Approve Status'},
        {title: 'Approved By'},
        {title: 'Action'}
    ];

    public onSearch = async (): Promise<void> => {};

    public onReset = (): void => {};

    public onCancel = (): void => {};

    public onCreate = (): void => {};

}
