import {Component} from '@angular/core';
import {of} from 'rxjs';
import {SUPPLIER_SETUP} from '../../../../data/constant/crumb.constant';
import {TableCol} from '../../../../shared/components/table/table.component';

@Component({
    selector: 'app-company-people-supplier',
    templateUrl: './company-people-supplier.component.html',
    styles: []
})
export class CompanyPeopleSupplierComponent {

    public crumbs = SUPPLIER_SETUP;
    public isOpenHeader = true;
    public isLoading = false;
    public list = of(Array(1));


    public tableCols: TableCol[] = [
        {title: 'Supplier #'},
        {title: 'Full Name'},
        {title: 'Business Name'},
        {title: 'Product Category'}, //array of product category
        {title: 'Phone'},
        {title: 'Email'},
        {title: 'Address'},
        {title: 'Address'},
        {title: 'Recorded By'},
        {title: 'Since'},
        {title: 'Action'}
    ];

    public onSearch = async (): Promise<void> => {};

    public onReset = (): void => {};

    public onCancel = (): void => {};

}
