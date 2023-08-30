import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {Observable} from 'rxjs';
import {TableButtonEnum} from 'src/app/data/payload/common.enum';
import {PagePayload} from '../../../../../../data/payload/common.payload';
import {TableCol} from '../../../../../../shared/components/table/table.component';
import {UtilService} from '../../../../../../shared/utils/util.service';
import {AccountPayload} from '../../../_data/account.payload';
import {AccountUsecase} from '../../../_usecase/account.usecase';

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
        {title: '', width: 5},
        {title: 'Name'},
        {title: 'Username'},
        {title: 'Phone'},
        {title: 'Role'},
        {title: 'Status'},
        {title: 'Exp. Date'}
    ];

    protected readonly TableButtonEnum = TableButtonEnum;

    constructor(
        private accountUsecase: AccountUsecase,
        private notification: NzNotificationService,
        private util: UtilService
    ) {}

    public onCancel = (): void => {};

    public onPageSizeChange(value: number) {
        this.pageRequest.pageSize = value;
        this.handlePageSizeChange().then();
    }

    public onPageIndexChange(value: number): void {
        this.pageRequest.pageNumber = value;
        this.handlePageSizeChange().then();
    }

    public emptyAction = async () => {};

    public handleStatusUpdate = async (id: number) => {
        const response$ = this.accountUsecase.toggleStatus(id);
        await this.util.handleUsecaseRequest(response$, this.notification);
    };

    public async handlePageSizeChange() {
        this.pageRequestChange.emit(this.pageRequest);
    }

}
