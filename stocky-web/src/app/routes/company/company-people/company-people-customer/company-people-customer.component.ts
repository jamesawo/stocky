import {Component} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, of} from 'rxjs';
import {CUSTOMER_SETUP} from 'src/app/data/constant/crumb.constant';
import {TableCol} from 'src/app/shared/components/table/table.component';
import {PageSearchPayload} from '../../../../data/payload/common.interface';
import {PagePayload} from '../../../../data/payload/common.payload';
import {UtilService} from '../../../../shared/utils/util.service';
import {CustomerSearchPayload} from '../../_data/company.payload';
import {PeopleCustomerUsecase} from '../../_usecase/people-customer.usecase';

@Component({
    selector: 'app-company-people-customer',
    templateUrl: './company-people-customer.component.html',
    styles: []
})
export class CompanyPeopleCustomerComponent {

    public tableData?: Observable<any>;
    public isOpenHeader = true;
    public isLoading = false;
    public isLoadingTable = false;
    public pageRequest = new PagePayload();
    public searchPayload = new CustomerSearchPayload();

    public crumbs = CUSTOMER_SETUP;

    public tableCols: TableCol[] = [
        {title: 'Full Name'},
        {title: 'Customer Tag'},
        {title: 'Phone'},
        {title: 'Email'},
        {title: 'Address'},
        {title: 'Registered By'},
        {title: 'Purchased Sum Total'},
        {title: 'Purchased Quantity Total'},
        {title: 'Purchased Receipts'},
        {title: 'Action'}
    ];

    constructor(
        private usecase: PeopleCustomerUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}


    public onSearch = async (): Promise<void> => {
        this.isLoading = true;
        this.isLoadingTable = true;

        const searchPayload: PageSearchPayload<CustomerSearchPayload> = {
            searchRequest: this.searchPayload,
            page: this.pageRequest
        };
        const observable = this.usecase.search(searchPayload);
        const response = await this.util.handleUsecaseRequest(observable, this.notification);

        if (response.ok) {
            this.tableData = of(response.body?.result);
        }
        this.isLoadingTable = false;
        this.isLoading = false;
    };

    public onCancel = (): void => {};

    public onReset = (): void => {
        this.searchPayload = new CustomerSearchPayload();
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


}
