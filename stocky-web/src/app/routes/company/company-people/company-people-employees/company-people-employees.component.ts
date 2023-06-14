import {Component} from '@angular/core';
import {of} from 'rxjs';
import {EMPLOYEE_SETUP} from '../../../../data/constant/crumb.constant';
import {ModalOrDrawer} from '../../../../data/payload/common.enum';
import {TableCol} from '../../../../shared/components/table/table.component';

@Component({
    selector: 'app-company-people-employees',
    templateUrl: './company-people-employees.component.html',
    styles: []
})
export class CompanyPeopleEmployeesComponent {

    public crumbs = EMPLOYEE_SETUP;
    public isOpenHeader = true;
    public isLoading = false;
    public list = of(Array(1));


    public tableCols: TableCol[] = [
        {title: 'Employee #'},
        {title: 'Full Name'},
        {title: 'Email'},
        {title: 'Phone'},
        {title: 'Date Registered'},
        {title: 'Expiration Date'},
        {title: 'Role'},
        {title: 'Action'}
    ];
    protected readonly ModalOrDrawer = ModalOrDrawer;

    public onSearch = async (): Promise<void> => {};

    public onReset = (): void => {};

    public onCancel = (): void => {};
}
