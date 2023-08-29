import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {TableButtonEnum} from 'src/app/data/payload/common.enum';
import {PagePayload} from '../../../../../../data/payload/common.payload';
import {TableCol} from '../../../../../../shared/components/table/table.component';
import {EmployeePayload} from '../../../../../company/_data/company.payload';
import {AccountPayload} from '../../../_data/account.payload';

@Component({
    selector: 'app-account-table-list',
    templateUrl: './account-table-list.component.html',
    styles: []
})
export class AccountTableListComponent {

    @Output()
    public pageRequestChange = new EventEmitter<PagePayload>();

    @Input()
    public pageRequest = new PagePayload();

    @Input()
    public tableData?: Observable<AccountPayload[]>;

    @Input()
    public isLoadingTable = false;

    public tableCols: TableCol[] = [
        {title: ''},
        {title: 'Name'},
        {title: 'Username'},
        {title: 'Phone'},
        {title: 'Role'},
        {title: 'Status'},
        {title: 'Exp. Date'}
    ];

    protected readonly TableButtonEnum = TableButtonEnum;

    constructor() {}

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
        this.pageRequestChange.emit(this.pageRequest);
    }

}
