import {Component, ViewChild} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable, of} from 'rxjs';
import {SUPPLIER_SETUP} from '../../../../data/constant/crumb.constant';
import {ProductRoutes} from '../../../../data/constant/routes.constant';
import {PageSearchPayload} from '../../../../data/payload/common.interface';
import {PagePayload} from '../../../../data/payload/common.payload';
import {SearchModelDropdownComponent} from '../../../../shared/components/search-model-dropdown/search-model-dropdown.component';
import {TableCol} from '../../../../shared/components/table/table.component';
import {UtilService} from '../../../../shared/utils/util.service';
import {SupplierPayload, SupplierSearchPayload} from '../../_data/company.payload';
import {PeopleSupplierUsecase} from '../../_usecase/people-supplier.usecase';

@Component({
    selector: 'app-company-people-supplier',
    templateUrl: './company-people-supplier.component.html',
    styles: []
})
export class CompanyPeopleSupplierComponent {

    @ViewChild('categorySearchDropdownComponent')
    public categorySearchDropdownComponent?: SearchModelDropdownComponent;

    public crumbs = SUPPLIER_SETUP;
    public isOpenHeader = true;
    public isLoading = false;

    public isLoadingTable = false;
    public pageRequest = new PagePayload();
    public searchPayload = new SupplierSearchPayload();
    public tableData?: Observable<SupplierPayload[]>;


    public tableCols: TableCol[] = [
        {title: 'Business Name'},
        {title: 'Full Name'},
        {title: 'Product Category'}, //array of product category
        {title: 'Phone'},
        {title: 'Email'},
        {title: 'Address'},
        {title: 'Recorded By'},
        {title: 'Since'},
        {title: 'Action'}
    ];
    protected readonly PRODUCT_ROUTES = ProductRoutes;

    constructor(
        private usecase: PeopleSupplierUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public onSearch = async (): Promise<void> => {
        this.isLoading = true;
        this.isLoadingTable = true;

        const searchPayload: PageSearchPayload<SupplierSearchPayload> = {
            searchRequest: this.searchPayload,
            page: this.pageRequest
        };
        const response = await this.util.handleUsecaseRequest(this.usecase.search(searchPayload), this.notification);

        if (response.ok) {
            this.resetTableData();
            this.tableData = of(response.body?.result!);
        }
        this.isLoadingTable = false;
        this.isLoading = false;
    };

    public onCancel = (): void => {};

    public onReset = (): void => {
        this.isLoading = false;
        this.searchPayload = new SupplierSearchPayload();
        this.resetTableData();
        this.categorySearchDropdownComponent?.clear();
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

    private resetTableData() {
        this.tableData = of();
    }
}
