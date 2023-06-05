import {Component} from '@angular/core';
import {EXPENSES_SETUP} from '../../../data/constant/crumb.constant';
import {TableCol} from '../../../shared/components/table/table.component';

@Component({
    selector: 'app-company-expenses-setup',
    templateUrl: './company-expenses-setup.component.html',
    styles: []
})
export class CompanyExpensesSetupComponent {
    public crumbs = EXPENSES_SETUP;
    public isOpenHeader = true;
    public isLoading = false;

    public tableCols: TableCol[] = [
        {title: 'Amount'},
        {title: 'Category'},
        {title: 'Recorded By'},
        {title: 'Recorded Date'},
        {title: 'Approval Status'},
        {title: 'Approved By'},
        {title: 'Approval Date'},
        {title: 'Comment'},
        {title: 'Uploads'},
        {title: 'Action '}
    ];

    public onSearch = async (): Promise<void> => {};

    public onReset = (): void => {};

    public onCancel = (): void => {};

}
