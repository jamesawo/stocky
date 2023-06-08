import {Component} from '@angular/core';
import {of} from 'rxjs';
import {CUSTOMER_SETUP} from '../../../../data/constant/crumb.constant';
import {TableCol} from '../../../../shared/components/table/table.component';

@Component({
    selector: 'app-company-people-customer',
    templateUrl: './company-people-customer.component.html',
    styles: []
})
export class CompanyPeopleCustomerComponent {

    public crumbs = CUSTOMER_SETUP;
    public isOpenHeader = true;
    public isLoading = false;
    public list = of(Array(1));


    public tableCols: TableCol[] = [
        {title: 'Customer #'},
        {title: 'Customer Tag'},
        {title: 'Full Name'},
        {title: 'Phone'},
        {title: 'Address'},
        {title: 'Email'},
        {title: 'Registered By'},
        {title: 'Purchased Sum Total'},
        {title: 'Purchased Quantity Total'},
        {title: 'Purchased Receipts'},
        {title: 'Action'}
    ];

    public onSearch = async (): Promise<void> => {};

    public onReset = (): void => {};

    public onCancel = (): void => {};


}
