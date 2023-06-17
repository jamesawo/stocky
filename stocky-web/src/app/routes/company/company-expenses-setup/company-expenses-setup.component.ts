import {Component} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, of} from 'rxjs';
import {EXPENSES_SETUP} from '../../../data/constant/crumb.constant';
import {ModalOrDrawer} from '../../../data/payload/common.enum';
import {PageSearchPayload} from '../../../data/payload/common.interface';
import {PagePayload} from '../../../data/payload/common.payload';
import {TableCol} from '../../../shared/components/table/table.component';
import {handleUsecaseRequest} from '../../../shared/utils/util';
import {ExpensesPayload, ExpensesSearchPayload} from '../_data/company.payload';
import {ExpensesUsecase} from '../_usecase/company-expenses/expenses.usecase';

@Component({
    selector: 'app-company-expenses-setup',
    templateUrl: './company-expenses-setup.component.html',
    styles: []
})
export class CompanyExpensesSetupComponent {
    public crumbs = EXPENSES_SETUP;
    public isOpenHeader = true;
    public isLoading = false;
    public searchPayload: ExpensesSearchPayload = new ExpensesSearchPayload();

    public isLoadingTable = false;
    public pageRequest = new PagePayload();

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
        {title: 'Action'}
    ];
    public tableData?: Observable<ExpensesPayload[]>;
    protected readonly ModalOrDrawer = ModalOrDrawer;

    constructor(private usecase: ExpensesUsecase, private notification: NzNotificationService) {}

    public onSearch = async (): Promise<void> => {
        this.isLoading = true;
        this.isLoadingTable = true;

        const searchPayload: PageSearchPayload<ExpensesSearchPayload> = {
            searchRequest: this.searchPayload,
            page: this.pageRequest
        };

        const response = await handleUsecaseRequest(
            this.usecase.search(searchPayload),
            this.notification
        );

        if (response.ok) {
            this.tableData = of(response.body?.result!);
        }
        this.isLoadingTable = false;
        this.isLoading = false;
    };

    public onResetSearchForm = (): void => {
        this.searchPayload = new ExpensesSearchPayload();
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
