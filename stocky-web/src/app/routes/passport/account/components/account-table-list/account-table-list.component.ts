import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {TableButtonEnum} from 'src/app/data/payload/common.enum';
import {PagePayload} from '../../../../../data/payload/common.payload';
import {TableCol} from '../../../../../shared/components/table/table.component';
import {UtilService} from '../../../../../shared/utils/util.service';
import {EmployeePayload} from '../../../../company/_data/company.payload';

@Component({
    selector: 'app-account-table-list',
    templateUrl: './account-table-list.component.html',
    styles: []
})
export class AccountTableListComponent {

    @Input()
    public pageRequest = new PagePayload();

    public tableData?: Observable<EmployeePayload[]>;
    public isLoading = false;
    public isLoadingTable = false;

    public tableCols: TableCol[] = [
        {title: 'Full Name'},
        {title: 'Email/Username'},
        {title: 'Phone'},
        {title: 'Role'},
        {title: 'Status'},
        {title: 'Action'}
    ];

    protected readonly TableButtonEnum = TableButtonEnum;

    constructor(
        private util: UtilService
    ) {}

    public onCancel = (): void => {};


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

    };

    public async onSearch() {
    }

}
