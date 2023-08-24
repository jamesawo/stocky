import {Component, ViewChild} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, of} from 'rxjs';
import {EMPLOYEE_SETUP} from '../../../../data/constant/crumb.constant';
import {ModalOrDrawer, TableButtonEnum} from '../../../../data/payload/common.enum';
import {PageSearchPayload} from '../../../../data/payload/common.interface';
import {PagePayload} from '../../../../data/payload/common.payload';
import {TableCol} from '../../../../shared/components/table/table.component';
import {UtilService} from '../../../../shared/utils/util.service';
import {
    CompanyPeopleEmployeeAddBtnComponent
} from '../../_components/company-people/people-employee/company-people-employee-add-btn/company-people-employee-add-btn.component';
import {EmployeePayload, EmployeeSearchPayload} from '../../_data/company.payload';
import {PeopleEmployeeUsecase} from '../../_usecase/people-employee.usecase';

@Component({
    selector: 'app-company-people-employees',
    templateUrl: './company-people-employees.component.html',
    styles: []
})
export class CompanyPeopleEmployeesComponent {

    @ViewChild('employeeAddBtnComponent')
    public employeeAddBtnComponent?: CompanyPeopleEmployeeAddBtnComponent;

    public tableData?: Observable<EmployeePayload[]>;
    public isOpenHeader = true;
    public isLoading = false;
    public isLoadingTable = false;
    public pageRequest = new PagePayload();
    public searchPayload = new EmployeeSearchPayload();
    public employee?: EmployeePayload;

    public crumbs = EMPLOYEE_SETUP;

    public tableCols: TableCol[] = [
        {title: 'Full Name'},
        {title: 'Email'},
        {title: 'Phone'},
        {title: 'Date Registered'},
        {title: 'Expiration Date'},
        {title: 'Role'},
        {title: 'Status'},
        {title: 'Action'}
    ];
    protected readonly ModalOrDrawer = ModalOrDrawer;
    protected readonly TableButtonEnum = TableButtonEnum;

    constructor(
        private usecase: PeopleEmployeeUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public onSearch = async (): Promise<void> => {
        this.isLoading = true;
        this.isLoadingTable = true;

        const searchPayload: PageSearchPayload<EmployeeSearchPayload> = {
            searchRequest: this.searchPayload,
            page: this.pageRequest
        };
        const response = await this.util.handleUsecaseRequest(this.usecase.search(searchPayload), this.notification);

        if (response.ok) {
            this.tableData = of(response.body?.result!);
        }
        this.isLoadingTable = false;
        this.isLoading = false;
    };

    public onCancel = (): void => {};

    public onReset = (): void => {
        this.searchPayload = new EmployeeSearchPayload();
        this.tableData = of();
    };

    public onPageSizeChange(value: number) {
        this.pageRequest.pageSize = value;
        this.onSearch().then();
    }

    public onPageIndexChange(value: number): void {
        this.pageRequest.pageNumber = value;
        this.onSearch().then();
    }

    public emptyAction = async (item: any) => {};

    public handleEdit = async (record: EmployeePayload): Promise<void> => {
        if (record && this.employeeAddBtnComponent) {
            this.employee = record;
            this.employeeAddBtnComponent.employee = record;
            this.employeeAddBtnComponent.isUpdating = true;
            this.employeeAddBtnComponent.toggle();
        }
    };
}
